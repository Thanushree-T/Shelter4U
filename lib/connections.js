import mongoose from "mongoose";

// CRITICAL: Disable TLS verification for Windows/Atlas compatibility
// This must happen before any connection is attempted
if (process.env.NODE_ENV !== "production") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

// Schemas
import HomeSecondSectionSchema from "@/Models/HomeSecondSection.js";
import ProjectSchema from "@/Models/Project.js";
import AreaSchema from "@/Models/Area.js";
import leadSchema from "@/Models/Leads.js";
import HomeThirdSectionSchema from "@/Models/HomeThirdSection.js";
import HomeFourthSectionSchema from "@/Models/HomeFourthSection.js";
import HomeFifthSectionSchema from "@/Models/HomeFifthSection.js";
import FooterSchema from "@/Models/Footer.js";
import companyProfileSchema from "@/Models/CompanyProfile.js";
import PrivacyPolicySchema from "@/Models/PrivacyPolicy.js";
import TeamSchema from "@/Models/Team.js";
import EventSchema from "@/Models/Event.js";
import CareerSchema from "@/Models/Career.js";
import VisionMissionSchema from "@/Models/VisionMission.js";
import LegalInformationSchema from "@/Models/LegalInformation.js";
import LoanForNRISchema from "@/Models/LoanForNRI.js";
import InquirySchema from "@/Models/Inquiry.js";
import BuilderSchema from "@/Models/Builder.js";
import stateSchema from "@/Models/State.js";
import citySchema from "@/Models/City.js";
import HomeFirstSectionSchema from "@/Models/HomeFirstSection.js";
import JobApplicationSchema from "@/Models/ApplyJob.js";

const mongo_url = process.env.MONGO_CONN;
const mongo_url_admin = process.env.MONGO_CONN_ADMIN;

const mongoOptions = {
  // Timeouts to prevent hanging
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,

  // Pool size
  maxPoolSize: 10,
  minPoolSize: 0, // Lazy connection: don't connect until needed
};

// Helper to create connection
function createConn(url, label) {
  if (!url) {
    console.error(`❌ MongoDB [${label}] URL missing!`);
    return null;
  }

  const conn = mongoose.createConnection(url, mongoOptions);

  conn.on("connected", () => console.log(`✅ MongoDB [${label}] connected`));
  conn.on("error", (err) =>
    console.error(`❌ MongoDB [${label}] error: ${err.message}`),
  );
  conn.on("disconnected", () =>
    console.warn(`⚠️ MongoDB [${label}] disconnected`),
  );

  return conn;
}

// Singleton handling
let conn = global._mongoConn;
let admin_conn = global._mongoAdminConn;

if (!conn || conn.readyState === 99) {
  // 99 is uninitialized (custom check)
  conn = createConn(mongo_url, "main");
  global._mongoConn = conn;
}

if (!admin_conn || admin_conn.readyState === 99) {
  admin_conn = createConn(mongo_url_admin, "admin");
  global._mongoAdminConn = admin_conn;
}

// Model getting helper
const getModel = (connection, name, schema) => {
  if (!connection) return null;
  try {
    return connection.model(name);
  } catch {
    return connection.model(name, schema);
  }
};

// Define models
const HomeSecondSection = getModel(
  conn,
  "HomeSecondSection",
  HomeSecondSectionSchema,
);
const HomeThirdSection = getModel(
  conn,
  "HomeThirdSection",
  HomeThirdSectionSchema,
);
const HomeFourthSection = getModel(
  conn,
  "HomeFourthSection",
  HomeFourthSectionSchema,
);
const HomeFifthSection = getModel(
  conn,
  "HomeFifthSection",
  HomeFifthSectionSchema,
);
const Footer = getModel(conn, "Footer", FooterSchema);
const CompanyProfile = getModel(conn, "CompanyProfile", companyProfileSchema);
const PrivacyPolicy = getModel(conn, "PrivacyPolicy", PrivacyPolicySchema);
const Team = getModel(conn, "Team", TeamSchema);
const VisionMission = getModel(conn, "VisionMission", VisionMissionSchema);
const LegalInformation = getModel(
  conn,
  "LegalInformation",
  LegalInformationSchema,
);
const LoanForNRI = getModel(conn, "LoanForNRI", LoanForNRISchema);
const HomeFirstSection = getModel(
  conn,
  "HomeFirstSection",
  HomeFirstSectionSchema,
);
const Event = getModel(conn, "Event", EventSchema);

const Inquiry = getModel(admin_conn, "Inquiry", InquirySchema);
const Project = getModel(admin_conn, "Project", ProjectSchema);
const Area = getModel(admin_conn, "Area", AreaSchema);
const Leads = getModel(admin_conn, "Leads", leadSchema);
const Career = getModel(admin_conn, "Career", CareerSchema);
const Builder = getModel(admin_conn, "Builder", BuilderSchema);
const State = getModel(admin_conn, "State", stateSchema);
const City = getModel(admin_conn, "City", citySchema);
const ApplyJob = getModel(admin_conn, "JobApplication", JobApplicationSchema);

// Export
export const connectToDBs = async () => {
  // No-op: connections are established on module load by createConnection
  // We can add a check here if we want to ensure connection is ready
  if (conn && conn.readyState !== 1) {
    // It might be connecting
  }
};

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
