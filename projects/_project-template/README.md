# New Project Template

Copy this folder and rename it using lowercase words separated by hyphens.

Recommended files:

- `cover.jpg`: main landscape image shown on the portfolio
- `demo.mp4`: short demonstration video
- `report.pdf`: project report
- `screenshots/`: interface and testing screenshots
- `source/`: optional source code when the project is small

Then copy this object into `../projects.json` and update its values:

```json
{
  "folder": "projects/your-project-name/",
  "title": "Your Project Title",
  "type": "Personal Project",
  "period": "06/2026 - Present",
  "summary": "One concise sentence explaining the project.",
  "categories": ["plc"],
  "technologies": ["Technology 1", "Technology 2"],
  "highlights": [
    "Important engineering contribution.",
    "Measured result or completed feature."
  ],
  "cover": "projects/your-project-name/cover.jpg",
  "links": {
    "Source": "https://github.com/...",
    "Demo": "",
    "Report": ""
  }
}
```
