// 퀸잇 스타일링 프록시 서버
// Node.js + Express

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS 설정 (Netlify 웹사이트에서 접근 허용)
app.use(cors({
    origin: [
        'https://symphonious-mousse-9e658a.netlify.app',
        'http://localhost:*', // 로컬 테스트용
    ],
    methods: ['POST', 'OPTIONS'],
    credentials: true
}));

app.use(express.json({ limit: '50mb' })); // 이미지 크기 고려

// 헬스체크 엔드포인트
app.get('/', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: '퀸잇 스타일링 API 서버',
        version: '1.0.0'
    });
});

// 스타일링 분석 엔드포인트
app.post('/api/analyze', async (req, res) => {
    try {
        const { image } = req.body;

        if (!image || !image.base64 || !image.type) {
            return res.status(400).json({ 
                error: '이미지 데이터가 필요합니다.' 
            });
        }

        console.log('스타일링 분석 요청 받음:', new Date().toISOString());

        // Claude API 호출
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.CLAUDE_API_KEY,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 4000,
                messages: [{
                    role: 'user',
                    content: [
                        {
                            type: 'image',
                            source: {
                                type: 'base64',
                                media_type: image.type,
                                data: image.base64
                            }
                        },
                        {
                            type: 'text',
                            text: `이 제품의 스타일링 조합을 추천해줘.

**퀸잇 베스트셀러 원칙**:
- 청바지(35%) > 슬랙스(20%)
- 터틀넥 니트(30%) > 블라우스
- 원피스(20%) 활용
- 무채색 80% (Black 40%, Ivory 20%, Beige 15%, Gray 15%)
- 포인트 컬러: Blue/Yellow만 소량

**4050 체형 고려**:
- 밑위 높은 청바지
- 목선 커버 (터틀넥)
- 편의성 (세탁 쉬움)

다음 형식으로 3가지 조합 추천:

**🥇 조합 1 (베스트)**
- 하의: [아이템명]
- 이너: [아이템명]
- 신발: [아이템명]
- 가방: [아이템명]
- 점수: [퀸잇 판매 근거로 점수]
- 적합 상황: [TPO]
- 이유: [왜 이 조합?]

**🥈 조합 2**
(동일 형식)

**🥉 조합 3**
(동일 형식)

**⚠️ 피해야 할 것**:
- Mint Green, Powder Pink (판매 없음)
- Wide Pants (판매 거의 없음)
- 고채도 파스텔

간결하고 실용적으로 작성해줘.`
                        }
                    ]
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Claude API 오류:', errorData);
            return res.status(response.status).json({
                error: errorData.error?.message || 'Claude API 오류'
            });
        }

        const data = await response.json();
        const result = data.content[0].text;

        console.log('분석 완료:', result.substring(0, 100) + '...');

        res.json({ result });

    } catch (error) {
        console.error('서버 오류:', error);
        res.status(500).json({ 
            error: '서버 오류가 발생했습니다.',
            details: error.message 
        });
    }
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════╗
║   퀸잇 스타일링 API 서버 시작됨       ║
║   포트: ${PORT}                        ║
║   시간: ${new Date().toLocaleString()} ║
╚════════════════════════════════════════╝
    `);
    console.log(`\n접속 URL: http://localhost:${PORT}`);
    console.log(`헬스체크: http://localhost:${PORT}/`);
    console.log(`API: http://localhost:${PORT}/api/analyze\n`);
});

// 에러 핸들링
process.on('uncaughtException', (error) => {
    console.error('예외 발생:', error);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('거부된 Promise:', reason);
});
