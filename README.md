# 🚀 Apply Mate

> **Centralized Job Application Tracker** - Never lose track of your job applications again!

Apply Mate is a comprehensive job application management system that helps job seekers organize, track, and manage all their job applications in one centralized platform. Say goodbye to scattered spreadsheets and missed opportunities!

## 🎯 Problem Statement

Job hunting is chaotic - applying on different websites, tracking application status, remembering interview schedules, and managing follow-ups becomes overwhelming. Apply Mate solves this by providing a **centralized platform** where users can manage all their job applications efficiently.

## ✨ Key Features

### 🏠 **Dashboard**
- Centralized view of all job applications
- Real-time status tracking
- Quick insights and analytics

### 📝 **Job Application Management**
- Add, edit, and delete job applications
- Track application status: Applied, Interview, Offer, Rejected
- Store job details: company, role, location, applied date
- Job description and source tracking

### 🔧 **Chrome Extension**
- One-click job scraping from LinkedIn and Indeed
- Automatic job details extraction
- Seamless integration with the web app

### 📧 **Gmail Integration**
- Automatic status updates from emails
- Interview reminder notifications
- Smart email parsing for job-related communications

### 🔍 **Search & Filter**
- Filter by company, role, status, and date
- Advanced search capabilities
- Custom sorting options

### 📊 **Analytics & Insights**
- Application success rates
- Company-wise application tracking
- Time-based analytics and trends

### 📤 **Export & Import**
- Export data to CSV and PDF
- Import existing job applications
- Data backup and migration

## 🛠️ Tech Stack

### **Frontend**
- **Framework:** Next.js 15 with TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Icons:** Lucide React
- **State Management:** React Query + Zustand

### **Backend**
- **API:** Next.js API Routes
- **Database:** MongoDB Atlas with Mongoose
- **Authentication:** NextAuth.js with Google OAuth

### **Extensions & Integrations**
- **Chrome Extension:** Manifest v3 with Content Scripts
- **Email Integration:** Gmail API (OAuth 2.0)
- **AI Features:** OpenAI API (future enhancement)

### **Deployment**
- **Frontend & API:** Vercel
- **Database:** MongoDB Atlas
- **Extension:** Chrome Web Store

## 📁 Project Structure

```
apply_mate/
├── app/                    # Next.js app router
│   ├── (auth)/            # Authentication pages
│   ├── dashboard/         # Main dashboard
│   ├── jobs/[id]/         # Job detail pages
│   ├── api/               # Backend API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── jobs/          # Job management APIs
│   │   └── gmail/         # Gmail integration
│   └── layout.tsx
├── components/            # Reusable UI components
│   ├── ui/                # shadcn/ui components
│   ├── forms/             # Form components
│   └── charts/             # Analytics components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
│   ├── db.ts              # Database connection
│   ├── auth.ts            # Authentication helpers
│   └── gmail.ts           # Gmail API utilities
├── types/                 # TypeScript definitions
├── public/                # Static assets
└── extension/             # Chrome extension files
```

## 🗄️ Data Models

### User Model
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Job Application Model
```typescript
interface JobApplication {
  id: string;
  userId: string;
  company: string;
  role: string;
  location: string;
  jobDescription: string;
  source: 'LinkedIn' | 'Indeed' | 'Company Website' | 'Other';
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected';
  appliedDate: Date;
  updatedDate: Date;
  interviewDate?: Date;
  notes?: string;
  resumeVersion?: string;
  coverLetterVersion?: string;
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account
- Google Cloud Console project (for OAuth)
- Chrome browser (for extension development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/apply-mate.git
   cd apply-mate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   MONGODB_URI=your_mongodb_atlas_connection_string
   
   # Authentication
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=https://apply-mate-ai.netlify.app
   
   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   
   # Gmail API
   GMAIL_CLIENT_ID=your_gmail_client_id
   GMAIL_CLIENT_SECRET=your_gmail_client_secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [https://apply-mate-ai.netlify.app](https://apply-mate-ai.netlify.app)

## 🏗️ Development Phases

### Phase 1: MVP Core ✅
- [x] Project setup (Next.js + MongoDB)
- [x] User authentication system
- [x] Basic dashboard with CRUD operations
- [x] Job application management

### Phase 2: Chrome Extension 🚧
- [ ] Extension UI and authentication
- [ ] Job scraping from LinkedIn/Indeed
- [ ] API integration with main app

### Phase 3: Gmail Integration 📧
- [ ] Gmail OAuth setup
- [ ] Email parsing for status updates
- [ ] Automatic job status updates

### Phase 4: Polish & Deployment 🚀
- [ ] Testing and bug fixes
- [ ] Performance optimization
- [ ] Vercel deployment
- [ ] Chrome Web Store publication

## 🧪 Testing

```bash
# Run linting
npm run lint

# Run type checking
npm run type-check

# Run tests (when implemented)
npm run test
```

## 📦 Build & Deployment

### Production Build
```bash
npm run build
npm start
```

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Chrome Extension
1. Build the extension: `npm run build:extension`
2. Load unpacked extension in Chrome Developer mode
3. Submit to Chrome Web Store for distribution

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📋 Roadmap

### Future Enhancements
- [ ] AI-powered resume feedback
- [ ] Job recommendation system
- [ ] Team collaboration features
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Integration with more job boards

## ⚠️ Known Issues & Challenges

- **Gmail API Verification:** Strict verification process for production use
- **Job Board Changes:** DOM changes can break scraping functionality
- **Data Privacy:** Ensuring secure handling of sensitive job application data
- **Rate Limiting:** Managing API rate limits for Gmail and job boards

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Development:** Next.js + TypeScript, UI/UX
- **Backend Development:** API routes, Database design
- **Extension Development:** Chrome Extension, Job scraping
- **Integration:** Gmail API, Deployment, Automation

## 📞 Support

If you encounter any issues or have questions:

- Create an issue on GitHub
- Check our [documentation](docs/)
- Contact the development team

---

**Made with ❤️ for job seekers everywhere**

*Apply Mate - Your job application journey, simplified.*
