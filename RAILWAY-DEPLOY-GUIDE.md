# Railway 배포 완벽 가이드 (테스트용)

## 🎯 준비물
- GitHub 계정 (무료, 2분)
- Railway 계정 (무료, 1분)
- Claude API 키

---

## 📋 Step 1: GitHub 계정 만들기 (2분)

### 이미 GitHub 있으면 Skip!

```
1. https://github.com 접속

2. "Sign up" 클릭

3. 이메일 입력
   예: your-email@queenit.kr

4. 비밀번호 설정

5. 사용자명 입력
   예: queenit-team

6. 이메일 인증

7. 완료!
```

---

## 📦 Step 2: GitHub에 코드 업로드 (5분)

### 방법 A: 웹에서 직접 (가장 쉬움!)

```
1. GitHub 로그인

2. 우측 상단 "+" 클릭 → "New repository"

3. 정보 입력:
   - Repository name: queenit-styling-server
   - Description: 퀸잇 스타일링 서버
   - Public 선택
   - ✅ Add a README file 체크

4. "Create repository" 클릭

5. 파일 업로드:
   - "Add file" → "Upload files" 클릭
   - 아래 4개 파일 드래그:
     ✓ server.js
     ✓ package.json
     ✓ railway.json
     ✓ .env.example
   - "Commit changes" 클릭

6. 완료! ✨
```

**중요**: .env는 업로드 안 함! (.env.example만 업로드)

---

## 🚂 Step 3: Railway 배포 (3분)

### 1. Railway 가입

```
1. https://railway.app 접속

2. "Login" 클릭

3. "Login with GitHub" 선택

4. GitHub 계정으로 로그인

5. 권한 허용

6. 완료!
```

### 2. 프로젝트 배포

```
1. Railway 대시보드에서
   "New Project" 클릭

2. "Deploy from GitHub repo" 선택

3. "Configure GitHub App" 클릭
   → 권한 설정 (처음만)

4. 저장소 선택:
   "queenit-styling-server" 클릭

5. "Deploy Now" 클릭

6. 자동 배포 시작! ⚡
   (2-3분 소요)
```

### 3. 환경변수 설정

```
배포 완료되면:

1. 프로젝트 클릭

2. 우측 "Variables" 탭 클릭

3. "New Variable" 클릭

4. 추가할 변수:
   
   변수 1:
   - Variable: CLAUDE_API_KEY
   - Value: sk-ant-api03-xxxxx
   (실제 Claude API 키 입력)
   
   변수 2:
   - Variable: PORT
   - Value: 3000

5. "Add" 클릭

6. 자동 재배포됨! (1분)
```

---

## 🌐 Step 4: URL 확인

```
1. "Settings" 탭 클릭

2. "Networking" 섹션 찾기

3. "Generate Domain" 클릭

4. URL 자동 생성:
   예: queenit-styling-production.up.railway.app

5. 이 URL 복사! 📋
```

---

## ✅ Step 5: 테스트

### 브라우저에서 확인

```
방금 복사한 URL 접속:
https://queenit-styling-production.up.railway.app

화면에 표시:
{
  "status": "ok",
  "message": "퀸잇 스타일링 API 서버",
  "version": "1.0.0"
}

→ 성공! ✨
```

---

## 🎨 Step 6: 웹사이트 연결

### index.html 수정

```
1. index.html 파일 열기

2. 14번째 줄 찾기:
   const SERVER_URL = 'http://YOUR_SERVER_IP:3000';

3. Railway URL로 변경:
   const SERVER_URL = 'https://queenit-styling-production.up.railway.app';

4. 저장
```

### Netlify 재배포

```
1. Netlify 대시보드

2. Production deploys

3. 수정된 index.html이 있는 
   queenit-site 폴더 드래그

4. 10초 대기

5. 완료!
```

---

## 🎉 Step 7: 최종 테스트!

```
1. Netlify 웹사이트 접속
   https://symphonious-mousse-9e658a.netlify.app

2. 서버 URL 입력 (처음 1회):
   https://queenit-styling-production.up.railway.app

3. 저장

4. 제품 이미지 업로드

5. "자동 분석 시작" 클릭

6. 10초 대기...

7. 결과 나옴! 🎉🎉🎉
```

---

## 💰 무료 크레딧 확인

```
Railway 대시보드:
- Settings → Usage
- $5/월 무료 크레딧 확인
- 약 500시간 실행 가능

충분히 테스트 가능!
```

---

## 🔧 문제 해결

### Q: 배포 실패
```
원인: package.json 오류
해결: 파일 다시 업로드
```

### Q: "Application failed to respond"
```
원인: 환경변수 미설정
해결: CLAUDE_API_KEY 확인
```

### Q: URL 접속 안 됨
```
원인: 도메인 미생성
해결: Settings → Generate Domain
```

---

## 📊 예상 시간

```
GitHub 가입: 2분
코드 업로드: 5분
Railway 배포: 3분
테스트: 2분
───────────────
총: 12분
```

---

## ✅ 체크리스트

배포 전:
- [ ] GitHub 계정 있음
- [ ] Claude API 키 발급됨
- [ ] 파일 4개 준비됨

배포 중:
- [ ] GitHub repo 생성
- [ ] 파일 업로드
- [ ] Railway 가입
- [ ] 프로젝트 배포
- [ ] 환경변수 설정
- [ ] URL 생성

배포 후:
- [ ] 서버 URL 테스트
- [ ] index.html 수정
- [ ] Netlify 재배포
- [ ] 최종 테스트

---

## 🎁 보너스 팁

### 로그 확인

```
Railway 대시보드:
- "Deployments" 탭
- "View Logs" 클릭
- 실시간 로그 확인
```

### 재배포

```
GitHub에서 파일 수정하면
→ Railway 자동 재배포!
```

### 커스텀 도메인

```
Settings → Domains
→ Custom Domain 추가 가능
예: styling.queenit.kr
```

---

**준비되셨나요? 시작해봅시다!** 🚀
