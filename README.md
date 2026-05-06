# Previn Court Homes — Website

## Folder Structure

```
previn-court-homes/
├── index.html                     # Home page
├── about.html                     # About page
├── community.html                 # Community page (Westgate Village)
├── contact.html                   # Contact page (with collection select)
├── gallery.html                   # Gallery page
├── models.html                    # Collections overview (3 collection cards + comparison table)
├── collection-31ft.html           # 31' Collection — Modern Family Homes (5 models)
├── collection-40ft.html           # 40' Collection — Executive Homes (4 + 1 bungalow)
├── collection-50ft.html           # 50' Collection — Estate Homes (3 + 2 bungalows)
├── README.md
└── images/
    ├── logo-full.png                       # Logo (wordmark + crest)
    ├── logo-icon.png                       # Logo (crest only)
    ├── hero-background.jpg                 # Home-page hero
    ├── intro-home-dusk.jpg                 # Intro section (dusk exterior)
    ├── intro-home-exterior.jpg             # Intro section (daytime exterior)
    ├── community-westgate.jpg              # Community page imagery
    ├── testimonial-interior.jpg            # Testimonials section
    ├── gallery-*.jpg                       # Gallery section photos
    │
    ├── collections/
    │   ├── 31ft/
    │   │   ├── hero.jpg                    # Collection hero (real photo)
    │   │   └── siteplan.jpg                # Community site plan (PLACEHOLDER)
    │   ├── 40ft/
    │   │   ├── hero.jpg                    # Collection hero (real photo)
    │   │   └── siteplan.jpg                # Community site plan (PLACEHOLDER)
    │   └── 50ft/
    │       ├── hero.jpg                    # Collection hero (real photo)
    │       └── siteplan.jpg                # Community site plan (PLACEHOLDER)
    │
    └── models/
        # 31' Collection
        ├── brechtin/                       # 1,650 sqft, 3 bed
        ├── cupar/                          # 1,770 sqft, 3 bed
        ├── haddington/                     # 2,104 sqft, 4 bed
        ├── tobermory/                      # 2,274 sqft, 4 bed
        ├── elgin/                          # 2,295 sqft, 4 bed (Front/Side facade variants)
        # 40' Collection
        ├── dundee/                         # 2,700 sqft, 4 bed
        ├── melrose/                        # 2,745 sqft, 4 bed
        ├── perth/                          # 2,800 sqft, 4 bed
        ├── st-andrews/                     # 2,900 sqft, 5 bed
        ├── highland/                       # 2,054 sqft, 3 bed (BUNGALOW)
        # 50' Collection
        ├── hamilton/                       # 3,565 sqft, 4 bed
        ├── livingston/                     # 3,722 sqft, 5 bed
        ├── coatbridge/                     # 4,000 sqft, 5 bed
        ├── stonehaven/                     # 1,570 sqft, 2 bed (BUNGALOW)
        └── braemar/                        # 1,840 sqft, 3 bed (BUNGALOW)

        # Each model folder contains 5 images (all PLACEHOLDERS until uploaded):
        #   hero.jpg              # 4:3 primary exterior render
        #   elevation-a.jpg       # 16:10 Elevation A render (or "elevation-front.jpg" for Elgin)
        #   elevation-b.jpg       # 16:10 Elevation B render (or "elevation-side.jpg" for Elgin)
        #   floorplan-a.jpg       # 7:5 single composite floorplan, Elev A
        #   floorplan-b.jpg       # 7:5 single composite floorplan, Elev B
```

## Replacing Placeholder Assets

Every image with a navy background and gold "ASSET PENDING" text is a placeholder. To replace:

1. Find the asset's filename in the bottom-left corner of the placeholder image (e.g., `hero.jpg`)
2. Locate the file at the path shown in the file structure above
3. Overwrite it with your real image at the same dimensions/aspect ratio

## Collection Page Behavior

Each collection page (`collection-31ft.html` etc.) uses:
- Top-of-page **models grid** that links/scrolls to each model's accordion
- **Multi-open accordions** — multiple models can be expanded at once for comparison
- **Sticky model banner** that updates as you scroll through accordions
- **Elevation switcher** inside each accordion — click A/B (or Front/Side for Elgin) to swap floorplan images
- **Bungalow accent styling** to visually separate single-storey from two-storey homes

## Notes on the Catalog

- **Collection naming:** 31' / 40' / 50' (matches the official catalog; replaces older 32ft labeling)
- **Elgin special case:** offered exclusively on Elevation B with Front and Side facade orientations
- **Bungalows:** Highland (40'), Stonehaven (50'), Braemar (50') — single-storey homes mixed into their respective lot-frontage collections
