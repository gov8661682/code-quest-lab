"""Generate the release raster assets from the local Code Quest Lab icon.

The repository keeps the small SVG icon as the editable source of truth. This
script creates deterministic PNGs for browser install prompts and the
Capacitor projects so native builds do not fall back to Capacitor's sample
blue icon or splash screen.

Requires Pillow in the development environment. It is not a runtime
dependency of the web or native application.
"""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets" / "icon.svg"
SCALE = 4

BG = "#0b0b10"
FIELD = "#172819"
FIELD_EDGE = "#8a6d3b"
COMPASS = "#243b25"
GOLD = "#d8a23a"
GRID = "#a98f5c"
CREAM = "#ffe9a0"
CENTER_EDGE = "#ffd98a"


def require_source_markers() -> None:
    source = SOURCE.read_text(encoding="utf-8")
    markers = (
        "Code Quest Lab app icon",
        "#d8a23a",
        "#ffe9a0",
        "M256 92v316M98 250h316",
    )
    missing = [marker for marker in markers if marker not in source]
    if missing:
        raise SystemExit(f"{SOURCE} no longer matches the raster source contract: {missing}")


def px(value: float, unit: float) -> int:
    return round(value * unit)


def draw_compass(draw: ImageDraw.ImageDraw, unit: float, *, include_field: bool) -> None:
    """Draw the 512x512 compass coordinate system at the requested scale."""

    if include_field:
        draw.rounded_rectangle(
            (0, 0, px(512, unit) - 1, px(512, unit) - 1),
            radius=px(96, unit),
            fill=BG,
        )
        draw.rounded_rectangle(
            (px(26, unit), px(26, unit), px(486, unit), px(486, unit)),
            radius=px(78, unit),
            fill=FIELD,
            outline=FIELD_EDGE,
            width=max(1, px(8, unit)),
        )

    draw.ellipse(
        (px(114, unit), px(108, unit), px(398, unit), px(392, unit)),
        fill=COMPASS,
        outline=GOLD,
        width=max(1, px(10, unit)),
    )
    draw.line(
        (px(256, unit), px(92, unit), px(256, unit), px(408, unit)),
        fill=GRID,
        width=max(1, px(4, unit)),
    )
    draw.line(
        (px(98, unit), px(250, unit), px(414, unit), px(250, unit)),
        fill=GRID,
        width=max(1, px(4, unit)),
    )
    draw.polygon(
        (
            (px(256, unit), px(112, unit)),
            (px(298, unit), px(250, unit)),
            (px(256, unit), px(388, unit)),
            (px(214, unit), px(250, unit)),
        ),
        fill=GOLD,
    )
    draw.polygon(
        (
            (px(256, unit), px(140, unit)),
            (px(274, unit), px(250, unit)),
            (px(256, unit), px(360, unit)),
            (px(238, unit), px(250, unit)),
        ),
        fill=CREAM,
    )
    draw.ellipse(
        (px(234, unit), px(228, unit), px(278, unit), px(272, unit)),
        fill=BG,
        outline=CENTER_EDGE,
        width=max(1, px(6, unit)),
    )
    draw.line(
        (px(134, unit), px(430, unit), px(378, unit), px(430, unit)),
        fill=GOLD,
        width=max(1, px(8, unit)),
    )


def brand_icon(size: int, *, foreground: bool = False) -> Image.Image:
    canvas_size = size * SCALE
    image = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0) if foreground else BG)
    draw = ImageDraw.Draw(image)
    draw_compass(draw, canvas_size / 512, include_field=not foreground)
    return image.resize((size, size), Image.Resampling.LANCZOS)


def brand_splash(width: int, height: int) -> Image.Image:
    splash_scale = 2
    canvas_width = width * splash_scale
    canvas_height = height * splash_scale
    image = Image.new("RGBA", (canvas_width, canvas_height), BG)
    icon_size = max(96, round(min(width, height) * 0.42))
    icon = brand_icon(icon_size * splash_scale)
    image.alpha_composite(
        icon,
        ((canvas_width - icon.width) // 2, (canvas_height - icon.height) // 2),
    )
    return image.resize((width, height), Image.Resampling.LANCZOS).convert("RGB")


def write_png(relative: str, image: Image.Image) -> None:
    path = ROOT / relative
    path.parent.mkdir(parents=True, exist_ok=True)
    image.save(path, format="PNG", optimize=False, compress_level=9)
    print(f"generated {relative} ({image.width}x{image.height})")


def main() -> None:
    require_source_markers()

    write_png("assets/icon-192.png", brand_icon(192))
    write_png("assets/icon-512.png", brand_icon(512))

    android_densities = {
        "mdpi": (48, 108),
        "hdpi": (72, 162),
        "xhdpi": (96, 216),
        "xxhdpi": (144, 324),
        "xxxhdpi": (192, 432),
    }
    for density, (icon_size, foreground_size) in android_densities.items():
        base = f"android/app/src/main/res/mipmap-{density}"
        write_png(f"{base}/ic_launcher.png", brand_icon(icon_size))
        write_png(f"{base}/ic_launcher_round.png", brand_icon(icon_size))
        write_png(
            f"{base}/ic_launcher_foreground.png",
            brand_icon(foreground_size, foreground=True),
        )

    write_png(
        "ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png",
        brand_icon(1024).convert("RGB"),
    )

    for splash in sorted((ROOT / "android" / "app" / "src" / "main" / "res").glob("drawable*/splash.png")):
        relative = splash.relative_to(ROOT).as_posix()
        with Image.open(splash) as existing:
            dimensions = existing.size
        write_png(relative, brand_splash(*dimensions))

    for splash in sorted((ROOT / "ios" / "App" / "App" / "Assets.xcassets" / "Splash.imageset").glob("splash-*.png")):
        relative = splash.relative_to(ROOT).as_posix()
        with Image.open(splash) as existing:
            dimensions = existing.size
        write_png(relative, brand_splash(*dimensions))


if __name__ == "__main__":
    main()
