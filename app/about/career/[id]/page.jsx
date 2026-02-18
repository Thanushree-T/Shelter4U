// app/about/career/[id]/page.jsx
import ViewDetailCareer from './ViewDetailCareer.jsx'; 

export default async function CareerDetailPage({ params }) {
  const { id } = await params;

  return <ViewDetailCareer id={id} />;
}
