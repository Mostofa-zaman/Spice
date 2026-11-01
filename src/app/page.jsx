import OffersExplorer from "@/components/common/OffersExplorer";
import { getOffers, offerSections } from "@/services/offerService";



export default function Home() {

  const offers = getOffers();
 

  return (
   
<> 
<OffersExplorer
  offers={offers}
  sections={offerSections}
/>
</>
  );
}
