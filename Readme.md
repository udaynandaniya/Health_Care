# RuralReach Healthcare Platform 🏥

A comprehensive healthcare platform designed for rural communities, connecting patients with healthcare providers through emergency alerts, telemedicine, mental health assessments, and community health resources.

## 🌟 Features

### 🚨 Emergency Alert System
- **Quick SOS Button**: Instant emergency alerts to nearby hospitals
- **Detailed Emergency Forms**: Comprehensive emergency reporting with priority levels
- **Real-time Hospital Response**: Live tracking of hospital acceptance/response
- **Location-based Services**: GPS integration for accurate emergency location
- **Alert History**: Complete record of past emergency requests

### 🧠 Mental Health Assessments
- **PHQ-9 Depression Screening**: Clinical-grade depression assessment
- **GAD-7 Anxiety Screening**: Standardized anxiety disorder screening
- **Clinical Scoring**: Professional-grade scoring algorithms
- **Personalized Recommendations**: Tailored mental health guidance
- **Crisis Intervention**: Automatic alerts for severe cases
- **Assessment History**: Track mental health progress over time

### 📊 Wellness Dashboard
- **Mood Tracking**: Daily mood, energy, anxiety, and sleep logging
- **Wellness Score**: Comprehensive health score calculation
- **7-Day Trends**: Visual mood and wellness trend analysis
- **Progress Monitoring**: Long-term health pattern tracking

### 🏥 Healthcare Network
- **Hospital Directory**: Complete list of connected healthcare facilities
- **Doctor Profiles**: Verified healthcare professional information
- **Specialty Services**: Filter hospitals by medical specialties
- **24/7 Emergency Services**: Identify hospitals with emergency capabilities

### 📱 Community Features
- **Healthcare Posts**: Educational content from doctors and hospitals
- **Interactive Engagement**: Like and comment on healthcare posts
- **Medical Updates**: Latest health news and announcements
- **Professional Verification**: Verified badges for healthcare providers

### 🔐 Security & Authentication
- **JWT Authentication**: Secure token-based authentication
- **Role-based Access**: Different access levels for users, doctors, and hospitals
- **Session Management**: 30-day secure sessions with automatic renewal
- **Data Protection**: HIPAA-compliant data handling

## 🚀 Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **Shadcn/ui**: Modern UI component library
- **Lucide React**: Beautiful icon library

### Backend
- **Next.js API Routes**: Serverless API endpoints
- **MongoDB**: NoSQL database for scalable data storage
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Token authentication
- **bcryptjs**: Password hashing and security

### Additional Libraries
- **React Hot Toast**: User-friendly notifications
- **Geolocation API**: Location services for emergencies
- **Date-fns**: Date manipulation and formatting

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **MongoDB** database (local or cloud)
- **Modern web browser** with geolocation support

## ⚙️ Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/ruralreach-healthcare.git
   cd ruralreach-healthcare
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   \`\`\`env
   
 

4. **Set up the database**
   
   Make sure MongoDB is running, then the app will automatically create the necessary collections on first run.

5. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

\`\`\`
ruralreach-healthcare/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── user/                 # User-specific endpoints
│   │   ├── doctor/               # Doctor-specific endpoints
│   │   ├── hospital/             # Hospital-specific endpoints
│   │   └── posts/                # Healthcare posts endpoints
│   ├── user/                     # User dashboard pages
│   ├── doctor/                   # Doctor dashboard pages
│   ├── hospital/                 # Hospital dashboard pages
│   ├── auth/                     # Authentication pages
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                   # Reusable components
│   ├── ui/                       # Shadcn/ui components
│   ├── assessments/              # Mental health assessment components
│   ├── auth/                     # Authentication components
│   └── dashboard/                # Dashboard components
├── lib/                          # Utility libraries
│   ├── models/                   # MongoDB models
│   ├── auth.ts                   # Authentication configuration
│   ├── mongodb.ts                # Database connection
│   └── utils.ts                  # Utility functions
├── hooks/                        # Custom React hooks
├── types/                        # TypeScript type definitions
├── public/                       # Static assets
└── README.md                     # Project documentation
\`\`\`

## 🔧 Configuration

### Database Models

The platform uses the following main data models:

- **User**: Patient/user accounts with medical information
- **Doctor**: Healthcare professional profiles
- **Hospital**: Healthcare facility information
- **Post**: Healthcare content and announcements
- **Assessment**: Mental health assessment results
- **EmergencyAlert**: Emergency request records
- **MoodEntry**: Daily mood tracking data

### Authentication Flow

1. **Registration**: Users create accounts with email/password
2. **Login**: JWT tokens issued for 30-day sessions
3. **Authorization**: Role-based access control (User/Doctor/Hospital)
4. **Session Management**: Automatic token refresh and validation

### Emergency Alert Workflow

1. **Alert Creation**: User triggers emergency alert (SOS or detailed form)
2. **Location Detection**: GPS coordinates captured automatically
3. **Hospital Notification**: Nearby hospitals receive real-time alerts
4. **Response Tracking**: Monitor hospital acceptance/response status
5. **Follow-up**: Automatic escalation if no response within 3 minutes

## 🧪 Mental Health Assessments

### PHQ-9 Depression Screening
- **9 standardized questions** based on DSM-5 criteria
- **Clinical scoring**: 0-27 point scale
- **Severity levels**: Minimal, Mild, Moderate, Moderately Severe, Severe
- **Professional recommendations** based on score ranges

### GAD-7 Anxiety Screening
- **7 standardized questions** for generalized anxiety disorder
- **Clinical scoring**: 0-21 point scale
- **Severity levels**: Minimal, Mild, Moderate, Severe
- **Intervention recommendations** for each severity level

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy automatically** on every push to main branch

### Manual Deployment

1. **Build the application**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Start production server**
   \`\`\`bash
   npm start
   \`\`\`

### Environment Variables for Production

\`\`\`env
# Production Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ruralreach

# Secure JWT Secret (generate a strong random key)
JWT_SECRET=your-production-jwt-secret-key

# Production URL
NEXTAUTH_URL=https://your-domain.com
\`\`\`

## 🔒 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Security**: Secure token generation and validation
- **HTTP-Only Cookies**: Prevent XSS attacks
- **CORS Protection**: Secure cross-origin requests
- **Input Validation**: Comprehensive data validation
- **Rate Limiting**: API endpoint protection
- **HIPAA Compliance**: Healthcare data protection standards

## 📱 Mobile Responsiveness

The platform is fully responsive and optimized for:
- **Desktop**: Full-featured dashboard experience
- **Tablet**: Touch-optimized interface
- **Mobile**: Emergency-first mobile design
- **PWA Ready**: Progressive Web App capabilities

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow **TypeScript** best practices
- Use **ESLint** and **Prettier** for code formatting
- Write **comprehensive tests** for new features
- Update **documentation** for API changes
- Follow **conventional commits** for commit messages

## 🐛 Troubleshooting

### Common Issues

**Database Connection Error**
\`\`\`bash
Error: MongooseError: Operation `users.findOne()` buffering timed out
\`\`\`
**Solution**: Check MongoDB connection string and ensure database is running

**JWT Token Error**
\`\`\`bash
Error: JsonWebTokenError: invalid signature
\`\`\`
**Solution**: Verify JWT_SECRET environment variable is set correctly

**Geolocation Not Working**
\`\`\`bash
Error: User denied geolocation
\`\`\`
**Solution**: Ensure HTTPS in production and request location permission

**Build Errors**
\`\`\`bash
Error: Module not found
\`\`\`
**Solution**: Clear node_modules and reinstall dependencies

### Performance Optimization

- **Image Optimization**: Use Next.js Image component
- **Code Splitting**: Implement dynamic imports for large components
- **Caching**: Utilize Redis for session and data caching
- **CDN**: Use Vercel Edge Network for static assets

## 📊 Monitoring & Analytics

### Health Metrics
- **Emergency Response Time**: Average hospital response time
- **Assessment Completion Rate**: Mental health screening adoption
- **User Engagement**: Dashboard usage and feature adoption
- **System Uptime**: Platform availability and reliability

### Error Tracking
- **Sentry Integration**: Real-time error monitoring
- **Performance Monitoring**: Core Web Vitals tracking
- **User Feedback**: In-app feedback collection

## 🔮 Roadmap

### Phase 1 (Current)
- ✅ Emergency Alert System
- ✅ Mental Health Assessments
- ✅ Basic Dashboard
- ✅ User Authentication

### Phase 2 (Next)
- 🔄 Telemedicine Integration
- 🔄 Appointment Scheduling
- 🔄 Prescription Management
- 🔄 Health Records

### Phase 3 (Future)
- 📋 AI Health Assistant
- 📋 Wearable Device Integration
- 📋 Community Health Programs
- 📋 Multi-language Support

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Shadcn/ui** for the beautiful component library
- **Vercel** for hosting and deployment platform
- **MongoDB** for reliable database services
- **Healthcare Community** for guidance on medical standards
- **Open Source Contributors** for their valuable contributions

## 📞 Support

For support and questions:

- **Email**: support@ruralreach.com
- **Documentation**: [docs.ruralreach.com](https://docs.ruralreach.com)
- **Issues**: [GitHub Issues](https://github.com/your-username/ruralreach-healthcare/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/ruralreach-healthcare/discussions)

---

**Made with ❤️ for rural healthcare communities**

*Empowering rural communities with accessible, technology-driven healthcare solutions.*
