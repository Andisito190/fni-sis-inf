import AcademicTeamCard from './AcademicTeamCard';
import ServiceCard from './ServiceCard';

export default function Sidebar() {
  return (
    <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">
      <AcademicTeamCard />
      <ServiceCard />
    </aside>
  );
}
