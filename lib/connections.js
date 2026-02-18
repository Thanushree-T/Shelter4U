import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

//Schema
import HomeSecondSectionSchema from '@/Models/HomeSecondSection.js';
import ProjectSchema from '@/Models/Project.js';
import AreaSchema from '@/Models/Area.js';
import leadSchema from '@/Models/Leads.js';
import HomeThirdSectionSchema from '@/Models/HomeThirdSection.js';
import HomeFourthSectionSchema from '@/Models/HomeFourthSection.js';
import HomeFifthSectionSchema from '@/Models/HomeFifthSection.js';
import FooterSchema from '@/Models/Footer.js';
import companyProfileSchema from '@/Models/CompanyProfile.js';
import PrivacyPolicySchema from '@/Models/PrivacyPolicy.js';
import TeamSchema from '@/Models/Team.js';
import EventSchema from '@/Models/Event.js';
import CareerSchema from '@/Models/Career.js';
import VisionMissionSchema from '@/Models/VisionMission.js';
import LegalInformationSchema from '@/Models/LegalInformation.js';
import LoanForNRISchema from '@/Models/LoanForNRI.js';
import InquirySchema from '@/Models/Inquiry.js';
import BuilderSchema from '@/Models/Builder.js';
import stateSchema from '@/Models/State.js';
import citySchema from '@/Models/City.js';
import HomeFirstSectionSchema from '@/Models/HomeFirstSection.js';
import JobApplicationSchema from '@/Models/ApplyJob.js';

// CONNECTION STRINGS
const mongo_url = process.env.MONGO_CONN;
const mongo_url_admin = process.env.MONGO_CONN_ADMIN;

// CONNECTIONS
const conn = mongoose.createConnection(mongo_url, {});
const admin_conn = mongoose.createConnection(mongo_url_admin, {});

// MODELS
const HomeSecondSection = conn.model('HomeSecondSection', HomeSecondSectionSchema);
const HomeThirdSection = conn.model('HomeThirdSection', HomeThirdSectionSchema);
const HomeFourthSection = conn.model('HomeFourthSection', HomeFourthSectionSchema);
const HomeFifthSection = conn.model('HomeFifthSection', HomeFifthSectionSchema);
const Footer = conn.model('Footer', FooterSchema);
const CompanyProfile = conn.model('CompanyProfile', companyProfileSchema);
const PrivacyPolicy = conn.model('PrivacyPolicy', PrivacyPolicySchema);
const Team = conn.model('Team', TeamSchema);
const VisionMission = conn.model('VisionMission', VisionMissionSchema);
const LegalInformation = conn.model('LegalInformation', LegalInformationSchema);  
const LoanForNRI = conn.model('LoanForNRI', LoanForNRISchema);
const HomeFirstSection = conn.model('HomeFirstSection', HomeFirstSectionSchema);
const Event = conn.model('Event', EventSchema);


const Inquiry = admin_conn.model('Inquiry', InquirySchema);
const Project = admin_conn.model('Project', ProjectSchema);
const Area = admin_conn.model('Area', AreaSchema);
const Leads = admin_conn.model('Leads', leadSchema);
const Career = admin_conn.model('Career', CareerSchema);
const Builder = admin_conn.model('Builder', BuilderSchema);
const State = admin_conn.model('State', stateSchema);
const City = admin_conn.model('City', citySchema);
const ApplyJob = admin_conn.model('JobApplication', JobApplicationSchema);


export const connectToDBs = async () => {
  try {
    await conn.asPromise();
    console.log("✅ Connected to CRM DB");
    await admin_conn.asPromise();
    console.log("✅ Connected to Admin Panel DB");
  } catch (err) {
    console.error("❌ DB connection error:", err);
    process.exit(1);
  }
};

// EXPORT MODELS
export const models = {
  conn,
  admin_conn,
  HomeSecondSection,
  Project,
  Area,
  Leads,
  HomeThirdSection,
  HomeFourthSection,
  HomeFifthSection,
  Footer,
  CompanyProfile,
  PrivacyPolicy,
  Team,
  Career,
  Event,
  VisionMission,
  LegalInformation,
  LoanForNRI,
  Inquiry, 
  Builder,
  HomeFirstSection,
  ApplyJob,
  State,
  City,
};

