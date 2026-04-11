# Chicago Dog Parks

Your complete guide to dog parks and dog-friendly areas (DFAs) in Chicago. A static informational site covering all 33+ official DFAs, 2 dog beaches, rules & permits, seasonal tips, community organizations, and news.

**Live site:** [chicagodogparks.org](https://chicagodogparks.org)

## Tech Stack

- **Framework:** [Jekyll](https://jekyllrb.com/) (static site generator)
- **Hosting:** GitHub Pages
- **Styling:** Custom Sass/SCSS (earthy greens, warm tans, mobile-first responsive)
- **JavaScript:** Vanilla JS (park filtering only)
- **Plugins:** jekyll-seo-tag, jekyll-sitemap, jekyll-feed
- **CI/CD:** GitHub Actions workflow (auto-deploys on push to `main`)

## Project Structure

```
_config.yml          # Site configuration
_layouts/            # Page templates (default, page, post, park)
_includes/           # Reusable partials (header, footer, park-card)
_parks/              # 39 park data files (Jekyll collection)
_posts/              # News blog posts
_data/               # Navigation, amenities, neighborhoods
_sass/               # Sass partials (variables, base, cards, etc.)
assets/
  css/main.scss      # Main stylesheet entry point
  js/parks-filter.js # Client-side park filtering
pages/               # Static pages (parks, rules, seasonal, community, about, news)
index.html           # Homepage
```

## Local Setup

### Prerequisites

- Ruby 3.x
- Bundler (`gem install bundler`)

### Install & Run

```bash
git clone git@github.com:bacharakis/chicagodogparks.org.git
cd chicagodogparks.org
bundle install
bundle exec jekyll serve
```

The site will be available at `http://localhost:4000`.

### Live Reload

```bash
bundle exec jekyll serve --livereload
```

## Deployment

The site deploys automatically via GitHub Actions on every push to `main`. To enable:

1. Go to repo **Settings > Pages**
2. Set Source to **GitHub Actions**

## Adding Content

### New Park

Create a file in `_parks/` with this front matter:

```yaml
---
title: Park Name
address: 123 Street, Chicago, IL 60600
neighborhood: Neighborhood Name
acreage: "0.5 acres"
surface: Artificial turf
hours: 6:00 AM - 11:00 PM
amenities:
  - fountains
  - benches
  - separate_areas
highlights:
  - Notable feature
---

Description of the park.
```

Available amenity keys are defined in `_data/amenities.yml`.

### New News Post

Create a file in `_posts/` named `YYYY-MM-DD-slug.md`:

```yaml
---
layout: post
title: "Post Title"
date: YYYY-MM-DD
category: Category
---

Post content in Markdown.
```

## License

Content is for informational purposes only. Not affiliated with the Chicago Park District.
