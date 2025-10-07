/**
 * Divination MCP Server - Simple Express API
 * 提供前端测试接口 (模拟 MCP 调用)
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// 模拟数据生成函数
function generateMockTarotReading(spreadType, question) {
    const cards = [
        { name: '愚者', meaning: '新开始、纯真、冒险', position: 'upright' },
        { name: '魔术师', meaning: '创造力、意志力、技能', position: 'upright' },
        { name: '女祭司', meaning: '直觉、神秘、潜意识', position: 'reversed' },
        { name: '皇后', meaning: '丰饶、母性、自然', position: 'upright' },
        { name: '皇帝', meaning: '权威、结构、控制', position: 'upright' }
    ];
    
    const numCards = spreadType === 'single' ? 1 : spreadType === 'three_card' ? 3 : 5;
    const selectedCards = cards.slice(0, numCards);
    
    return {
        spread_type: spreadType,
        question: question,
        cards: selectedCards,
        interpretation: `针对"${question}"的解读：您当前处于一个${selectedCards[0].meaning}的阶段。`,
        timestamp: new Date().toISOString()
    };
}

function generateMockZiweiChart(solarDate, birthHour, gender) {
    return {
        solar_date: solarDate,
        birth_hour: birthHour,
        gender: gender,
        lunar_date: '农历转换示例',
        chart: {
            命宫: { main_star: '紫微', minor_stars: ['天魁', '左辅'] },
            父母宫: { main_star: '天机', minor_stars: ['文昌'] },
            福德宫: { main_star: '太阳', minor_stars: ['天钺'] },
            田宅宫: { main_star: '武曲', minor_stars: ['右弼'] }
        },
        personality: '您的个性特征：领导力强，思维敏捷。',
        fortune: '整体运势良好，适合发展事业。',
        timestamp: new Date().toISOString()
    };
}

function generateMockBirthChart(birthDate, birthTime, latitude, longitude, timezone) {
    return {
        birth_info: {
            date: birthDate,
            time: birthTime,
            location: { lat: latitude, lng: longitude },
            timezone: timezone
        },
        sun_sign: '天蝎座',
        moon_sign: '巨蟹座',
        rising_sign: '处女座',
        planets: {
            mercury: { sign: '天蝎座', house: 3 },
            venus: { sign: '天秤座', house: 2 },
            mars: { sign: '射手座', house: 4 }
        },
        aspects: [
            { planet1: '太阳', planet2: '月亮', aspect: '三分相', orb: 2.5 }
        ],
        interpretation: '您的太阳在天蝎座，展现出深刻洞察力和强大意志力。',
        mode: 'fallback',
        timestamp: new Date().toISOString()
    };
}

function generateMockDreamInterpretation(dreamDescription) {
    return {
        dream_description: dreamDescription,
        symbols: ['水', '飞行', '追逐'],
        interpretation: {
            overall: '您的梦境反映了内心对自由的渴望和对未知的探索欲望。',
            symbols_meaning: {
                '水': '情感流动，潜意识的涌动',
                '飞行': '超越限制，追求更高境界',
                '追逐': '目标追求，或逃避压力'
            },
            psychological_analysis: '梦境显示您正在经历重要的心理转变期。',
            suggestions: '建议多关注内心感受，保持情绪平衡。'
        },
        timestamp: new Date().toISOString()
    };
}

function generateMockBaziAnalysis(solarDate, birthHour) {
    return {
        solar_date: solarDate,
        birth_hour: birthHour,
        lunar_date: '农历示例',
        bazi: {
            year_pillar: { heavenly: '甲', earthly: '子', element: '木水' },
            month_pillar: { heavenly: '乙', earthly: '丑', element: '木土' },
            day_pillar: { heavenly: '丙', earthly: '寅', element: '火木' },
            hour_pillar: { heavenly: '丁', earthly: '卯', element: '火木' }
        },
        five_elements: {
            metal: 0,
            wood: 4,
            water: 1,
            fire: 2,
            earth: 1
        },
        personality: '木旺之命，性格积极向上，富有生命力。',
        fortune: '木多需要金来修剪，建议从事需要理性判断的工作。',
        lucky_colors: ['白色', '金色'],
        lucky_numbers: [4, 9],
        timestamp: new Date().toISOString()
    };
}

function generateMockIChingDivination(question) {
    const hexagrams = [
        { number: 1, name: '乾', meaning: '刚健、进取、领导' },
        { number: 2, name: '坤', meaning: '柔顺、承载、包容' },
        { number: 11, name: '泰', meaning: '通泰、和谐、顺利' },
        { number: 63, name: '既济', meaning: '完成、成功、稳定' }
    ];
    
    const selectedHex = hexagrams[Math.floor(Math.random() * hexagrams.length)];
    
    return {
        question: question,
        hexagram: selectedHex,
        changing_lines: [3, 5],
        judgment: `卦象显示：${selectedHex.meaning}。这是一个积极的征兆。`,
        image: '天行健，君子以自强不息。',
        interpretation: `针对"${question}"：当前形势${selectedHex.meaning}，建议顺势而为。`,
        advice: '保持谨慎乐观的态度，稳扎稳打。',
        timestamp: new Date().toISOString()
    };
}

// API Routes

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Divination API Server is running',
        timestamp: new Date().toISOString()
    });
});

// Tarot Reading
app.post('/api/tarot', (req, res) => {
    try {
        const { spread_type, question } = req.body;
        
        if (!spread_type || !question) {
            return res.status(400).json({
                error: 'Missing required parameters: spread_type and question'
            });
        }
        
        const result = generateMockTarotReading(spread_type, question);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ziwei Chart
app.post('/api/ziwei', (req, res) => {
    try {
        const { solar_date, birth_hour, gender } = req.body;
        
        if (!solar_date || birth_hour === undefined || !gender) {
            return res.status(400).json({
                error: 'Missing required parameters: solar_date, birth_hour, and gender'
            });
        }
        
        const result = generateMockZiweiChart(solar_date, birth_hour, gender);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Birth Chart (Astrology)
app.post('/api/astrology', (req, res) => {
    try {
        const { birth_date, birth_time, latitude, longitude, timezone } = req.body;
        
        if (!birth_date || !birth_time || latitude === undefined || longitude === undefined) {
            return res.status(400).json({
                error: 'Missing required parameters'
            });
        }
        
        const result = generateMockBirthChart(
            birth_date,
            birth_time,
            latitude,
            longitude,
            timezone || 'UTC'
        );
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Dream Interpretation
app.post('/api/dream', (req, res) => {
    try {
        const { dream_description } = req.body;
        
        if (!dream_description) {
            return res.status(400).json({
                error: 'Missing required parameter: dream_description'
            });
        }
        
        const result = generateMockDreamInterpretation(dream_description);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Bazi Analysis
app.post('/api/bazi', (req, res) => {
    try {
        const { solar_date, birth_hour } = req.body;
        
        if (!solar_date || birth_hour === undefined) {
            return res.status(400).json({
                error: 'Missing required parameters: solar_date and birth_hour'
            });
        }
        
        const result = generateMockBaziAnalysis(solar_date, birth_hour);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// I Ching Divination
app.post('/api/iching', (req, res) => {
    try {
        const { question } = req.body;
        
        if (!question) {
            return res.status(400).json({
                error: 'Missing required parameter: question'
            });
        }
        
        const result = generateMockIChingDivination(question);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log('╔════════════════════════════════════════════════╗');
    console.log('║  🔮 综合占卜系统 - Web 测试服务器              ║');
    console.log('╚════════════════════════════════════════════════╝');
    console.log();
    console.log(`🌐 服务器地址: http://localhost:${PORT}`);
    console.log();
    console.log('📡 可用端点:');
    console.log('   GET  /              - 前端测试页面');
    console.log('   GET  /health        - 健康检查');
    console.log('   POST /api/tarot     - 塔罗占卜');
    console.log('   POST /api/ziwei     - 紫微斗数');
    console.log('   POST /api/astrology - 西洋占星');
    console.log('   POST /api/dream     - 梦境解析');
    console.log('   POST /api/bazi      - 八字命理');
    console.log('   POST /api/iching    - 易经卜卦');
    console.log();
    console.log('✨ 服务器已启动！在浏览器中打开上方地址进行测试');
    console.log('   按 Ctrl+C 停止服务器');
    console.log();
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\n🛑 正在关闭服务器...');
    process.exit(0);
});
