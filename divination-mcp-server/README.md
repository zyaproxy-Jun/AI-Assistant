# Divination MCP Server

A comprehensive Model Context Protocol (MCP) server that integrates multiple traditional and modern divination systems.

## Features

This MCP server provides tools for:

1. **塔罗占卜 (Tarot Reading)** - Multiple spreads including single card, three-card, and Celtic Cross
   - Based on [tarotcardapi](https://github.com/zyaproxy-Jun/tarotcardapi) by Kushagra Srivastava
   - Complete 78-card deck with detailed English descriptions
2. **紫微斗数 (Zi Wei Dou Shu)** - Chinese Purple Star Astrology chart generation
   - Using [iztro](https://github.com/zyaproxy-Jun/iztro) library
3. **西洋占星 (Western Astrology)** - Professional birth chart calculation with Swiss Ephemeris principles
   - Based on [Astrologer-API](https://github.com/zyaproxy-Jun/Astrologer-API) methodology
   - Using [circular-natal-horoscope-js](https://www.npmjs.com/package/circular-natal-horoscope-js) for accurate astronomical calculations
4. **梦境解析 (Dream Interpretation)** - AI-powered dream analysis with psychological insights
   - Based on [dream-interpretation](https://github.com/zyaproxy-Jun/dream-interpretation) framework
5. **八字命理 (BaZi/Four Pillars)** - Chinese destiny analysis based on birth time
   - Using [lunar-javascript](https://github.com/zyaproxy-Jun/lunar-javascript) library
6. **易经卜卦 (I-Ching)** - Book of Changes divination with hexagram interpretation (complete 64 hexagrams)
   - Based on [i-ching.el](https://github.com/zyaproxy-Jun/i-ching) data

## Installation

```bash
npm install
npm run build
```

## 🌐 Web Testing Interface

We provide a beautiful web interface to test all divination features!

### Quick Start

```bash
# Start the test server
node web-server.js

# Open in browser
http://localhost:3000
```

### Features

✨ **Responsive Design** - Works on desktop and mobile  
✨ **6 Divination Systems** - Separate tabs for each  
✨ **Complete Forms** - All parameters clearly displayed  
✨ **Live Preview** - Beautiful loading animations  
✨ **Source Links** - Data sources for each system  

See [WEB_TESTING_GUIDE.md](WEB_TESTING_GUIDE.md) for more details.

⚠️ **Note**: The web interface is for demonstration only. Actual divination requires calling through Claude Desktop's MCP protocol.

---

## Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
# Optional: OpenAI API key for enhanced dream interpretation
OPENAI_API_KEY=your_api_key_here
```

### MCP Configuration

Add to your MCP settings file (e.g., `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "divination": {
      "command": "node",
      "args": ["/path/to/divination-mcp-server/dist/index.js"],
      "env": {
        "OPENAI_API_KEY": "your_key_here"
      }
    }
  }
}
```

## Usage Examples

### Tarot Reading

```
Use tarot_reading with:
- spread_type: "three_card"
- question: "What should I focus on this month?"
- language: "zh-CN"
```

### Zi Wei Dou Shu Chart

```
Use ziwei_chart with:
- solar_date: "2000-08-16"
- birth_hour: 14
- gender: "female"
- language: "zh-CN"
```

### Dream Interpretation

```
Use interpret_dream with:
- dream_description: "I dreamed I was flying over the ocean"
- emotions: ["joy", "freedom"]
- recurring: false
- language: "en"
```

### BaZi Analysis

```
Use bazi_analysis with:
- solar_date: "1990-05-20"
- birth_hour: 10
- gender: "male"
- language: "zh-CN"
```

### I-Ching Divination

```
Use iching_divination with:
- question: "Should I pursue this opportunity?"
- method: "coins"
- language: "zh-CN"
```

## Supported Languages

- `zh-CN` - Simplified Chinese (简体中文)
- `zh-TW` - Traditional Chinese (繁體中文)
- `en` - English

## Architecture

The server is built with:
- TypeScript for type safety
- Model Context Protocol SDK for MCP integration
- iztro for Zi Wei Dou Shu calculations
- lunar-javascript for lunar calendar conversions
- OpenAI API (optional) for enhanced dream interpretation

## Project Structure

```
divination-mcp-server/
├── src/
│   ├── index.ts              # Main server entry point
│   └── services/
│       ├── tarot.ts          # Tarot reading service
│       ├── ziwei.ts          # Zi Wei Dou Shu service
│       ├── astrology.ts      # Western astrology service
│       ├── dream.ts          # Dream interpretation service
│       ├── bazi.ts           # BaZi analysis service
│       └── iching.ts         # I-Ching divination service
├── package.json
├── tsconfig.json
└── README.md
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Development with auto-rebuild
npm run dev

# Start server
npm start
```

## Sources

This project integrates methods and knowledge from:
- **Tarot**: Complete 78-card data from [tarotcardapi](https://github.com/zyaproxy-Jun/tarotcardapi) by Kushagra Srivastava (MIT License)
- **Zi Wei Dou Shu**: Based on [iztro](https://github.com/zyaproxy-Jun/iztro) library (MIT License, forked from [SylarLong/iztro](https://github.com/SylarLong/iztro))
- **Western Astrology**: Professional calculations inspired by [Astrologer-API](https://github.com/zyaproxy-Jun/Astrologer-API) (MIT License), using [circular-natal-horoscope-js](https://www.npmjs.com/package/circular-natal-horoscope-js) (Unlicense) for Swiss Ephemeris-based astronomical calculations
- **Dream Analysis**: Professional prompt engineering from [dream-interpretation](https://github.com/zyaproxy-Jun/dream-interpretation) by zyaproxy-Jun
- **BaZi**: Using [lunar-javascript](https://github.com/zyaproxy-Jun/lunar-javascript) library (MIT License, forked from [6tail/lunar-javascript](https://github.com/6tail/lunar-javascript))
- **I-Ching**: Complete 64 hexagrams data from [i-ching.el](https://github.com/zyaproxy-Jun/i-ching) (GPL-3.0)
  - AI-powered structured analysis framework
  - Multi-dimensional interpretation (Symbols, Culture, Psychology, Reality)
  - 10+ language support with cultural adaptation
- **BaZi**: Traditional Chinese Four Pillars system
- **I-Ching**: Book of Changes (King Wen sequence) - Complete 64 hexagrams
  - Chinese text: Original I-Ching (周易) text (Public Domain)
  - English translations: Based on [i-ching.el](https://github.com/zyaproxy-Jun/i-ching) by nik gaffney (GPL-3.0)
  - Translations reference: Wilhelm-Baynes, Legge, Pearson

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## Disclaimer

This divination server is provided for entertainment and self-reflection purposes. Results should not be considered as professional advice for medical, legal, financial, or other important life decisions.

## Acknowledgments

- **tarotcardapi** by Kushagra Srivastava for complete 78-card tarot data
- **dream-interpretation** by zyaproxy-Jun for professional dream analysis prompt engineering
- **i-ching.el** by nik gaffney (FoAM) for I-Ching English translations and hexagram interpretations
- **iztro** library for Zi Wei Dou Shu calculations
- **lunar-javascript** for accurate lunar calendar conversions
- **OpenAI** for AI-powered interpretation capabilities
- Wilhelm-Baynes, James Legge, and Richard Pearson for classic I-Ching translations
- Traditional divination wisdom passed down through generations
