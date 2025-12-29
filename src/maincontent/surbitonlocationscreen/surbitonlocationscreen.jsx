import SurbitonLocationScreenHero from './sections/surbitonlocationscreenhero';
import SurbitonLocationScreenMain from './sections/surbitonlocationscreenmain';
import SurbitonLocationScreenFAQ from './sections/surbitonlocationscreenfaq';

export default function SurbitonScreen() {
  return (
    <div>
      <SurbitonLocationScreenHero />
      <SurbitonLocationScreenMain />
      <SurbitonLocationScreenFAQ />
    </div>
  );
}
