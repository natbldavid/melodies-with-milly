import CobhamLocationScreenHero from './sections/cobhamlocationscreenhero';
import CobhamLocationScreenMain from './sections/cobhamlocationscreenmain';
import CobhamLocationScreenFAQ from './sections/cobhamlocationscreenfaq';

export default function FarnhamScreen() {
  return (
    <div>
      <CobhamLocationScreenHero />
      <CobhamLocationScreenMain />
      <CobhamLocationScreenFAQ />
    </div>
  );
}
