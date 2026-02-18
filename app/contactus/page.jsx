import ContactUsClient from "./ContactUsClient";

export async function generateMetadata() {
  return {
    title: "Contact Us | Shelter4U",
    description:
      "Reach out to Shelter4U for all your real estate needs. Contact us via phone, email, or visit our office for property assistance and zero-brokerage services.",
    keywords: [
      "Contact Shelter4U",
      "Shelter4U phone",
      "Shelter4U email",
      "real estate contact",
      "Shelter4U India",
      "property contact page",
    ],
    openGraph: {
      title: "Contact Us ",
      description:
        "Get in touch with Shelter4U. We're here to help you with all your real estate needs. Zero brokerage and expert assistance guaranteed.",
      url: "https://shelter4u.in/contactus",
      type: "website",
      images: [
        {
          url: "/logo.png", 
          width: 1200,
          height: 630,
          alt: "Shelter4U Contact Page",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Contact Us | Shelter4U",
      description:
        "Need help with buying or selling property? Contact Shelter4U for fast, transparent, and zero-brokerage services.",
      images: ["/logo.png"],
    },
    alternates: {
      canonical: "https://shelter4u.in/contactus",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function ContactPage() {
  return <ContactUsClient />;
}
