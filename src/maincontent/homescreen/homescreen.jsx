import HomeScreenHero from './sections/homescreenhero';
import HomeScreenCharacters from './sections/homescreencharacters';
import HomeScreenPackages from './sections/homescreenpackages';
import HomeScreenAboutMe from './sections/homescreenaboutme';
import HomeScreenTestimonials from './sections/homescreentestimonials';
import HomeScreenInformation from './sections/homescreeninformation';

export default function HomeScreen() {
  return (
    <div>
      <HomeScreenHero />
      <HomeScreenCharacters />
      <HomeScreenPackages />
      <HomeScreenInformation />
      <HomeScreenAboutMe />
      <HomeScreenTestimonials />
    </div>
  );
}
