# Product Requirements Document (PRD)
## Karigar - Hyperlocal Services Marketplace

---

## 1. Executive Summary

**Product Name:** Karigar  
**Version:** 1.0  
**Date:** February 11, 2026  
**Document Owner:** Development Team  

### 1.1 Product Overview
Karigar is a hyperlocal services marketplace web application that connects customers with nearby service providers (plumbers, electricians, tutors, cleaners, technicians, etc.). The platform addresses the critical gap in finding reliable local service providers by offering a centralized, location-aware solution that benefits both customers seeking services and professionals offering them.

### 1.2 Problem Statement
- **Customer Pain Points:** Difficulty finding reliable local service providers, reliance on scattered information sources, unverified listings, poor communication
- **Service Provider Pain Points:** Limited reach to nearby customers, inefficient request management, lack of professional visibility
- **Market Gap:** No centralized, transparent, location-aware platform for hyperlocal services

### 1.3 Success Metrics
- User registration rate (customers & service providers)
- Service request conversion rate
- Average response time to service requests
- User satisfaction scores and ratings
- Platform retention rate

---

## 2. Product Vision & Goals

### 2.1 Vision Statement
To become the most trusted hyperlocal services marketplace that seamlessly connects customers with verified, nearby service providers through a transparent, efficient, and user-friendly platform.

### 2.2 Product Goals
1. **Primary Goal:** Create a functional MVP that enables service discovery, request submission, and booking management
2. **User Experience:** Deliver intuitive, clear user flows for all stakeholders
3. **Trust & Transparency:** Build a rating and review system that ensures accountability
4. **Scalability:** Design architecture that supports future growth
5. **Efficiency:** Streamline the service request-to-completion workflow

---

## 3. User Personas & Roles

### 3.1 Customer (Primary User)
**Profile:**
- Age: 25-55
- Tech-savvy to moderate digital literacy
- Needs occasional to regular local services
- Values reliability, transparency, and convenience

**Goals:**
- Find trusted service providers quickly
- View transparent pricing and availability
- Track service request status
- Provide feedback on service quality

**Pain Points:**
- Unreliable word-of-mouth recommendations
- No visibility into provider availability
- Difficulty tracking service requests
- Lack of accountability mechanisms

### 3.2 Service Provider (Primary User)
**Profile:**
- Age: 22-60
- Skilled professionals (plumbers, electricians, tutors, etc.)
- Seeking more customer reach
- Wants efficient booking management

**Goals:**
- Increase customer base
- Manage availability efficiently
- Receive and manage service requests
- Build professional reputation

**Pain Points:**
- Limited marketing reach
- Missed opportunities due to poor visibility
- Inefficient request management
- No platform to showcase skills and ratings

### 3.3 Administrator (Optional - Bonus)
**Profile:**
- Platform moderator
- Ensures platform quality and safety

**Goals:**
- Maintain platform integrity
- Moderate content and resolve disputes
- Monitor platform health
- Manage user accounts

---

## 4. Feature Requirements

### 4.1 MVP Features (Must-Have)

#### 4.1.1 Authentication & Authorization
**Priority:** P0 (Critical)

| Feature | User Story | Acceptance Criteria |
|---------|-----------|---------------------|
| User Registration | As a user, I want to create an account so that I can access the platform | - Email/phone-based registration<br>- Password strength validation<br>- Role selection (Customer/Provider)<br>- Email/SMS verification |
| User Login | As a user, I want to log in securely | - Secure authentication<br>- Session management<br>- "Remember me" functionality<br>- Password reset option |
| Role-Based Access | As the system, I need to enforce role-based permissions | - Customers can only access customer features<br>- Providers can only access provider features<br>- Admins have full access |

#### 4.1.2 Customer Features
**Priority:** P0 (Critical)

| Feature | User Story | Acceptance Criteria |
|---------|-----------|---------------------|
| Browse Service Categories | As a customer, I want to browse services by category | - Display service categories (e.g., Plumbing, Electrical, Tutoring)<br>- Category-based filtering<br>- Visual category icons |
| Search Service Providers | As a customer, I want to search for providers by location and category | - Location-based search (city/area)<br>- Category filter<br>- Display search results with basic info |
| View Provider Profile | As a customer, I want to view detailed provider information | - Services offered<br>- Pricing information<br>- Availability status<br>- Ratings and reviews<br>- Contact information |
| Submit Service Request | As a customer, I want to request a service | - Select service type<br>- Choose preferred date/time<br>- Add description/notes<br>- Submit request<br>- Receive confirmation |
| Track Request Status | As a customer, I want to track my service requests | - View all my requests<br>- See current status (Pending, Confirmed, Completed, Cancelled)<br>- Status update notifications |
| Submit Reviews/Ratings | As a customer, I want to rate completed services | - Rating scale (1-5 stars)<br>- Written review option<br>- Only for completed services<br>- Display on provider profile |

#### 4.1.3 Service Provider Features
**Priority:** P0 (Critical)

| Feature | User Story | Acceptance Criteria |
|---------|-----------|---------------------|
| Create Provider Profile | As a provider, I want to create my professional profile | - Business/personal name<br>- Service categories<br>- Pricing information<br>- Service area (location)<br>- Profile photo<br>- Contact details |
| Manage Services | As a provider, I want to define my services | - Add/edit/delete services<br>- Set pricing per service<br>- Add service descriptions |
| Set Availability | As a provider, I want to manage my availability | - Set working hours<br>- Mark busy/available days<br>- Update availability status |
| Manage Service Requests | As a provider, I want to manage incoming requests | - View all incoming requests<br>- Accept request<br>- Reject request with reason<br>- Propose alternate time (reschedule) |
| View Booking History | As a provider, I want to see my confirmed bookings | - List all confirmed requests<br>- Filter by date/status<br>- View customer details |

#### 4.1.4 Request/Booking Workflow
**Priority:** P0 (Critical)

**Workflow States:**
1. **Requested** - Customer submits service request
2. **Pending** - Awaiting provider response
3. **Confirmed** - Provider accepts request
4. **Rescheduled** - Provider proposes new time
5. **Completed** - Service completed
6. **Cancelled** - Request cancelled by either party

**Business Rules:**
- Customers can cancel before confirmation
- Providers can reject with reason
- Once confirmed, cancellation requires notification
- Only completed services can be reviewed
- Providers cannot accept requests outside their service area

### 4.2 Admin Features (Optional - Bonus)
**Priority:** P1 (High Priority Bonus)

| Feature | User Story | Acceptance Criteria |
|---------|-----------|---------------------|
| User Management | As an admin, I want to manage all users | - View all customers and providers<br>- Suspend/activate accounts<br>- View user details |
| Provider Verification | As an admin, I want to verify service providers | - Approve new provider registrations<br>- Verify credentials<br>- Mark providers as "Verified" |
| Service Listing Moderation | As an admin, I want to moderate service listings | - Review service descriptions<br>- Remove inappropriate content<br>- Edit/update listings |
| Review Moderation | As an admin, I want to moderate reviews | - View all reviews<br>- Remove inappropriate reviews<br>- Handle review disputes |
| Dispute Resolution | As an admin, I want to handle user disputes | - View reported issues<br>- Communicate with involved parties<br>- Take moderation actions |
| Analytics Dashboard | As an admin, I want to see platform metrics | - Total users (customers/providers)<br>- Service requests by category<br>- Average ratings<br>- Active bookings |

### 4.3 Nice-to-Have Features (Future Scope)
**Priority:** P2 (Post-MVP)

- In-app messaging between customers and providers
- Payment gateway integration
- Real-time notifications (push/email/SMS)
- Advanced search filters (price range, rating, distance)
- Multi-language support
- Provider subscription tiers
- Appointment scheduling calendar
- Service packages and offers
- Customer loyalty programs

---

## 5. User Experience & User Flows

### 5.1 Customer Journey

#### Flow 1: Finding and Booking a Service
```
1. Customer lands on homepage
2. Browse categories OR Search by location + category
3. View list of service providers
4. Click on provider to view detailed profile
5. Review services, pricing, ratings, availability
6. Click "Request Service"
7. Fill service request form:
   - Select service type
   - Choose preferred date/time
   - Add description/requirements
8. Submit request
9. Receive confirmation message
10. Track request status in "My Requests"
11. Receive notification when provider responds
12. [If accepted] Request status → Confirmed
13. [If rejected] Notification with reason
14. [If rescheduled] Review alternate time → Accept/Decline
15. Service completed → Mark as complete
16. Submit rating and review
```

#### Flow 2: Tracking Requests
```
1. Navigate to "My Requests"
2. View all requests with status tags
3. Filter by status (All, Pending, Confirmed, Completed)
4. Click on request to view details
5. See provider response and communications
6. Take actions (Cancel, Accept reschedule, Mark complete)
```

### 5.2 Service Provider Journey

#### Flow 1: Profile Creation
```
1. Register as Service Provider
2. Complete profile setup:
   - Upload profile photo
   - Add business/personal name
   - Select service categories
   - Define service area (location)
   - Add services with pricing
   - Set availability schedule
3. Submit for review (if admin approval required)
4. Profile goes live
```

#### Flow 2: Managing Requests
```
1. Receive notification of new service request
2. Navigate to "Service Requests"
3. View request details:
   - Customer info
   - Service required
   - Preferred date/time
   - Special requirements
4. Check availability
5. Take action:
   - Accept → Request confirmed
   - Reject → Provide reason
   - Reschedule → Propose alternate time
6. Customer notified of response
7. [If accepted] Request appears in "My Bookings"
8. Complete service → Mark as completed
9. Receive customer rating and review
```

### 5.3 Admin Journey (Optional)

#### Flow 1: Provider Verification
```
1. New provider registration notification
2. Navigate to "Pending Verifications"
3. Review provider details and credentials
4. Verify information
5. Approve OR Reject with reason
6. Provider notified of decision
```

#### Flow 2: Dispute Resolution
```
1. Receive dispute/report notification
2. Review dispute details
3. View involved parties' information
4. Investigate (view request history, reviews)
5. Communicate with parties
6. Take action (warning, suspension, resolution)
7. Update dispute status and notify parties
```

---

## 6. Data Model & System Design

### 6.1 Core Entities

#### User
```
- user_id (PK)
- email
- phone_number
- password_hash
- role (CUSTOMER, PROVIDER, ADMIN)
- first_name
- last_name
- created_at
- updated_at
- status (ACTIVE, SUSPENDED, DELETED)
```

#### ServiceProvider (extends User)
```
- provider_id (PK)
- user_id (FK)
- business_name
- profile_photo_url
- bio
- service_area (location/city)
- is_verified
- average_rating
- total_reviews
- created_at
- updated_at
```

#### ServiceCategory
```
- category_id (PK)
- name (e.g., "Plumbing", "Electrical")
- description
- icon_url
- is_active
```

#### Service
```
- service_id (PK)
- provider_id (FK)
- category_id (FK)
- name
- description
- base_price
- price_unit (per hour, per job)
- is_active
- created_at
- updated_at
```

#### ServiceRequest
```
- request_id (PK)
- customer_id (FK to User)
- provider_id (FK to ServiceProvider)
- service_id (FK to Service)
- status (REQUESTED, PENDING, CONFIRMED, RESCHEDULED, COMPLETED, CANCELLED)
- preferred_date
- preferred_time
- description
- rejection_reason
- proposed_alternate_date
- proposed_alternate_time
- created_at
- updated_at
- completed_at
- cancelled_at
```

#### Review
```
- review_id (PK)
- request_id (FK)
- customer_id (FK)
- provider_id (FK)
- rating (1-5)
- comment
- is_moderated
- created_at
- updated_at
```

#### Availability
```
- availability_id (PK)
- provider_id (FK)
- day_of_week (0-6, 0=Sunday)
- start_time
- end_time
- is_available
```

### 6.2 System Architecture

**Architecture Pattern:** Monolithic MVC (for MVP) with clear separation of concerns

**Layers:**
1. **Presentation Layer** - Frontend UI (HTML, CSS, JavaScript)
2. **Application Layer** - Business logic and controllers
3. **Data Layer** - Database and data access objects

**Key Design Patterns:**
- MVC (Model-View-Controller)
- Repository Pattern for data access
- Service Layer for business logic
- Role-Based Access Control (RBAC)

### 6.3 Technology Recommendations

**Backend Options:**
- Node.js + Express.js
- Python + Django/Flask
- PHP + Laravel
- Ruby on Rails

**Frontend:**
- HTML5, CSS3, Vanilla JavaScript
- Optional: React.js, Vue.js (for enhanced UX)

**Database:**
- PostgreSQL (recommended for relational data)
- MySQL
- MongoDB (if document-based approach preferred)

**Authentication:**
- JWT (JSON Web Tokens)
- Session-based authentication

**Deployment:**
- Vercel/Netlify (frontend)
- Heroku/Railway/Render (backend)
- AWS/DigitalOcean (full stack)

---

## 7. Non-Functional Requirements

### 7.1 Performance
- Page load time < 3 seconds
- API response time < 500ms for most operations
- Support 100+ concurrent users (MVP)
- Database query optimization

### 7.2 Security
- HTTPS encryption for all communications
- Password hashing (bcrypt/argon2)
- SQL injection prevention
- XSS protection
- CSRF token implementation
- Input validation and sanitization
- Secure session management

### 7.3 Usability
- **Intuitive Navigation:** Clear menu structure, breadcrumbs
- **Responsive Design:** Mobile-first approach (60%+ mobile users expected)
- **Accessibility:** WCAG 2.1 Level AA compliance
- **Error Handling:** Clear, user-friendly error messages
- **Loading States:** Visual feedback during operations
- **Consistency:** Uniform UI components and patterns

### 7.4 Reliability
- 99% uptime target
- Graceful error handling
- Data backup and recovery procedures
- Transaction rollback for failed operations

### 7.5 Scalability Considerations
- Database indexing on frequently queried fields
- Pagination for large datasets
- Caching strategy (future implementation)
- Stateless API design
- Modular code structure for easy feature additions

### 7.6 Maintainability
- Clean, well-documented code
- Consistent coding standards
- Modular architecture
- Version control (Git)
- README with setup  instructions

---

## 8. Edge Cases & Error Handling

### 8.1 Critical Edge Cases

| Scenario | Handling Strategy |
|----------|-------------------|
| **Provider unavailable when request submitted** | Show real-time availability; prevent requests during unavailable slots |
| **Conflicting bookings** | Implement booking validation; lock slots when confirmed |
| **Service request cancellation** | Allow cancellation with status update; notify provider immediately |
| **Provider account suspended mid-booking** | Notify customer; allow rebooking with different provider |
| **Duplicate service requests** | Implement request debouncing; show warning if similar recent request |
| **Invalid location/service area** | Validate against provider's service area; show error if outside |
| **Rating without service completion** | Disable rating feature until service marked complete |
| **Provider rejection of all requests** | Track rejection rate; flag for admin review if excessive |
| **Incomplete profile** | Enforce minimum profile completeness; show progress indicator |
| **Stale data (availability changed)** | Implement cache invalidation; show last updated timestamp |

### 8.2 Error Handling Guidelines

**User-Facing Errors:**
- Clear, non-technical language
- Actionable guidance ("Try X" or "Contact support")
- Visual error states (red borders, icons)

**System Errors:**
- Log all errors for debugging
- Generic user message (avoid exposing system details)
- Graceful degradation

**Validation Errors:**
- Real-time field validation
- Clear indication of what's wrong
- Prevent form submission until resolved

---

## 9. Success Criteria & Metrics

### 9.1 Development Success Criteria

**Must Achieve for MVP:**
- ✅ User registration and authentication functional
- ✅ Service provider profiles created and viewable
- ✅ Service request submission workflow complete
- ✅ Request status tracking operational
- ✅ Rating and review system functional
- ✅ Role-based access control enforced
- ✅ Mobile-responsive design
- ✅ Core user flows tested and working

### 9.2 Business Metrics (Post-Launch)

**User Acquisition:**
- Target: 50+ registered customers in first month
- Target: 20+ service providers in first month

**Engagement:**
- Service request conversion rate > 40%
- Provider response rate > 80%
- Average provider rating > 4.0/5.0

**Platform Health:**
- Completion rate > 70%
- Cancellation rate < 15%
- Customer retention > 60% in 3 months

---

## 10. Implementation Roadmap

### 10.1 Phase 1: Foundation (Week 1)

**Priority:** P0

**Tasks:**
1. Project setup and environment configuration
2. Database schema design and implementation
3. User authentication system
4. Basic frontend structure and navigation
5. Role-based access control

**Deliverables:**
- Working authentication
- Database with core tables
- Basic UI framework

### 10.2 Phase 2: Core Features (Week 2-3)

**Priority:** P0

**Customer Features:**
1. Service category browsing
2. Provider search and filtering
3. Provider profile views
4. Service request submission
5. Request tracking dashboard

**Provider Features:**
1. Profile creation and management
2. Service management
3. Availability setting
4. Request management (accept/reject/reschedule)
5. Booking history view

**Deliverables:**
- End-to-end service request workflow
- Functional customer and provider dashboards

### 10.3 Phase 3: Enhancement & Polish (Week 4)

**Priority:** P0

**Tasks:**
1. Rating and review system
2. Enhanced error handling
3. UI/UX refinement
4. Mobile responsiveness optimization
5. Testing and bug fixes
6. Performance optimization

**Deliverables:**
- Polished, user-ready platform
- Complete user flows tested

### 10.4 Phase 4: Admin Features (Bonus)

**Priority:** P1

**Tasks:**
1. Admin dashboard
2. User management interface
3. Provider verification workflow
4. Review moderation
5. Basic analytics

**Deliverables:**
- Functional admin panel
- Platform oversight capabilities

---

## 11. Testing Strategy

### 11.1 Testing Types

**Functional Testing:**
- User registration and login
- Service request workflow
- Rating and review submission
- Provider profile management
- Admin moderation (if implemented)

**User Acceptance Testing:**
- Customer journey completion
- Provider journey completion
- Admin journey completion (if applicable)
- Cross-browser compatibility
- Mobile device testing

**Edge Case Testing:**
- Invalid inputs
- Boundary conditions
- Concurrent user scenarios
- Network failure scenarios

### 11.2 Test Scenarios

**Critical Paths:**
1. New customer registers → searches provider → submits request → tracks status → completes service → submits review
2. New provider registers → creates profile → receives request → manages request → completes booking
3. Admin reviews provider → moderates review → handles dispute

---

## 12. Risks & Mitigation

| Risk | Impact | Probability | Mitigation Strategy |
|------|--------|-------------|---------------------|
| **Scope creep** | High | Medium | Strict feature prioritization; defer nice-to-haves |
| **Time constraint** | High | High | Focus on MVP features; use AI tools effectively |
| **Technical complexity** | Medium | Medium | Choose familiar tech stack; leverage boilerplate for UI |
| **Data modeling errors** | High | Low | Early schema validation; peer review |
| **Poor UX** | Medium | Medium | User-centric design; iterative testing |
| **Security vulnerabilities** | High | Low | Follow security best practices; input validation |
| **Performance issues** | Medium | Low | Database indexing; efficient queries |

---

## 13. AI Tool Utilization Strategy

### 13.1 Recommended AI Usage

**Code Generation:**
- Boilerplate code (controllers, models, routes)
- UI components (forms, buttons, cards)
- Database queries
- Validation logic

**Problem Solving:**
- Architecture decisions
- Algorithm optimization
- Bug debugging
- Best practices consultation

**Documentation:**
- Code comments
- API documentation
- README files

**Design Assistance:**
- UI/UX suggestions
- Color schemes
- Layout recommendations

### 13.2 Best Practices
- Verify all AI-generated code
- Understand before implementing
- Iterate and refine prompts
- Use for acceleration, not replacement
- Ensure team can explain all code

---

## 14. Deliverables Checklist

### 14.1 Code Deliverables
- [ ] Source code repository (Git)
- [ ] Database schema and migrations
- [ ] Frontend application
- [ ] Backend API/application
- [ ] Configuration files

### 14.2 Documentation Deliverables
- [ ] README with setup instructions
- [ ] Architecture documentation
- [ ] API documentation (if applicable)
- [ ] User manual / guide
- [ ] Database schema diagram

### 14.3 Presentation Deliverables
- [ ] Live demo environment
- [ ] Demo script
- [ ] Feature walkthrough
- [ ] Technical architecture presentation
- [ ] Future roadmap overview

---

## 15. Appendix

### 15.1 Glossary

- **Karigar:** Urdu/Hindi word for skilled worker, artisan, or craftsperson
- **Hyperlocal:** Services focused on a very small geographical area
- **Service Provider:** Individual or business offering services
- **Service Request:** Customer's request for a specific service
- **Booking:** Confirmed service request

### 15.2 References

- Problem Statement Document
- Hackathon Evaluation Criteria
- Industry best practices for marketplace platforms

### 15.3 Approval & Sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Product Owner | [Name] | [Date] | _________ |
| Tech Lead | [Name] | [Date] | _________ |
| Design Lead | [Name] | [Date] | _________ |

---

**Document Version:** 1.0  
**Last Updated:** February 11, 2026  
**Next Review:** Pre-Development Kickoff
