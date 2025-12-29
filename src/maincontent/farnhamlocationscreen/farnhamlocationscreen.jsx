import FarnhamLocationScreenHero from './sections/farnhamlocationscreenhero';
import FarnhamLocationScreenMain from './sections/farnhamlocationscreenmain';
import FarnhamLocationScreenFAQ from './sections/farnhamlocationscreenfaq';

export default function FarnhamScreen() {
  return (
    <div>
      <FarnhamLocationScreenHero />
      <FarnhamLocationScreenMain />
      <FarnhamLocationScreenFAQ />
    </div>
  );
}
