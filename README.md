# Pinterest Image Downloader

A Chrome extension that adds download buttons to Pinterest images, allowing you to easily save high-quality images with a single click.

## Features

- 🖼️ **Easy Downloads**: One-click download buttons on Pinterest images
- 📸 **High Quality**: Attempts to download original resolution images
- 🎨 **Seamless Integration**: Matches Pinterest's design aesthetic
- 🔄 **Dynamic Loading**: Works with Pinterest's single-page app architecture
- 📱 **Responsive Design**: Works on both desktop and mobile Pinterest

## Installation

### Prerequisites
- Google Chrome browser
- Access to Chrome's Developer Mode

### Steps

1. **Download the Extension**
   - Click the green "Code" button above
   - Select "Download ZIP"
   - Extract the ZIP file to a folder on your computer

2. **Install in Chrome**
   - Open Google Chrome
   - Navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the folder containing the extension files

3. **Start Using**
   - Go to [Pinterest.com](https://pinterest.com)
   - You'll see red "Download" buttons on images
   - Click any button to download the image

## How It Works

The extension automatically detects Pinterest images and adds download buttons that:
- Integrate with Pinterest's existing UI
- Attempt to fetch the highest resolution version available
- Download images to your default Downloads folder
- Work on both individual pins and Pinterest feeds

## Files Structure

```
pinterest-image-downloader/
├── manifest.json       # Extension configuration
├── content.js         # Main script for adding download buttons
├── background.js      # Handles download functionality
├── styles.css         # Styling for download buttons
├── popup.html         # Extension popup interface
└── README.md          # This file
```

## Usage

1. Navigate to Pinterest.com
2. Browse images or search for content
3. Look for red "Download" buttons on images
4. Click to download high-quality versions

## Screenshots

*Add screenshots of the extension in action here*

## Troubleshooting

### Download buttons not appearing?
- Refresh the Pinterest page
- Ensure you're on pinterest.com (not other Pinterest domains)
- Check that the extension is enabled in chrome://extensions/

### Downloads failing?
- Check Chrome's download settings
- Verify you have permission to download files
- Some images may have restricted access

### Extension won't install?
- Ensure all files are in the same folder
- Verify Developer mode is enabled
- Check that manifest.json is properly formatted

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This extension is for personal use only. Please respect Pinterest's terms of service and copyright laws. Only download images you have permission to use.

## Support

If you encounter issues or have questions:
- Check the [Issues](../../issues) section
- Create a new issue if your problem isn't already reported
- Provide as much detail as possible about your setup and the issue

## Changelog

### v1.0.0
- Initial release
- Basic download functionality
- Pinterest UI integration
- High-resolution image detection

---

**Note**: This extension is not affiliated with Pinterest, Inc.
