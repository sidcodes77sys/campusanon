from PIL import Image, ImageDraw, ImageFont
import os

sizes = [16, 32, 48, 64, 128, 256]
images = []

for size in sizes:
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Dark background circle
    margin = size * 0.04
    draw.ellipse([margin, margin, size - margin, size - margin], fill=(8, 8, 22, 255))
    
    # Try to draw the ✦ symbol
    try:
        font_size = int(size * 0.65)
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", font_size)
    except:
        font = ImageFont.load_default()
    
    symbol = '✦'
    bbox = draw.textbbox((0, 0), symbol, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    x = (size - tw) / 2 - bbox[0]
    y = (size - th) / 2 - bbox[1]
    
    # Draw with neon pink color
    draw.text((x, y), symbol, fill=(255, 45, 120, 255), font=font)
    images.append(img)

# Save as ICO
images[0].save(
    '/home/claude/campusanon/public/favicon.ico',
    format='ICO',
    sizes=[(s, s) for s in sizes],
    append_images=images[1:]
)

# Also save a 192x192 PNG for PWA
img192 = Image.new('RGBA', (192, 192), (0, 0, 0, 0))
draw = ImageDraw.Draw(img192)
draw.ellipse([4, 4, 188, 188], fill=(8, 8, 22, 255))
try:
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 120)
except:
    font = ImageFont.load_default()
bbox = draw.textbbox((0, 0), '✦', font=font)
tw = bbox[2] - bbox[0]; th = bbox[3] - bbox[1]
x = (192 - tw) / 2 - bbox[0]; y = (192 - th) / 2 - bbox[1]
draw.text((x, y), '✦', fill=(255, 45, 120, 255), font=font)
img192.save('/home/claude/campusanon/public/logo192.png')

print("Done")
