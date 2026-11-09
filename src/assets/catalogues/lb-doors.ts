import en01 from './lb-doors/lb-doors-01-en.jpg.asset.json';
import fr01 from './lb-doors/lb-doors-01-fr.jpg.asset.json';
import en02 from './lb-doors/lb-doors-02-en.jpg.asset.json';
import fr02 from './lb-doors/lb-doors-02-fr.jpg.asset.json';
import en03 from './lb-doors/lb-doors-03-en.jpg.asset.json';
import fr03 from './lb-doors/lb-doors-03-fr.jpg.asset.json';

const wooden = { fr: 'Portes en bois', en: 'Wooden doors', ar: 'أبواب خشبية' };
const aluminium = { fr: 'Porte vitrée en aluminium et finitions', en: 'Aluminium glass door & finishes', ar: 'باب زجاجي من الألمنيوم والتشطيبات' };
const designs = { fr: 'Modèles de portes supplémentaires', en: 'Additional door designs', ar: 'تصاميم أبواب إضافية' };

export default {
  slug: 'lb-doors',
  pdf: '',
  pdfFr: '',
  convertedPrices: 0,
  pages: [
    {
      url: en01.url,
      frUrl: fr01.url,
      width: 1871,
      height: 1323,
      convertedPrices: 0,
      section: wooden,
      text: 'SPSDM001\nSolid Wood Gate\nTechwood grey\n204H X 95 W\nProjection Quantity/Set 500\nSPSFJM001\nHoneycomb paper inside Gate\nTechwood grey\n204 H X 85W\nProjection Quantity/Set 1500',
      frText: 'SPSDM001\nPorte en bois massif\nGris Techwood\n204H X 95 W\nQuantité par ensemble 500\nSPSFJM001\nPorte avec âme en nid d’abeille\nGris Techwood\n204 H X 85W\nQuantité par ensemble 1500',
      arText: 'SPSDM001\nباب من الخشب المصمت\nرمادي تيك وود\n204H X 95 W\nالكمية لكل طقم 500\nSPSFJM001\nباب بحشوة ورقية على شكل خلية نحل\nرمادي تيك وود\n204 H X 85W\nالكمية لكل طقم 1500',
    },
    {
      url: en02.url,
      frUrl: fr02.url,
      width: 1871,
      height: 1323,
      convertedPrices: 0,
      section: aluminium,
      text: 'BLM001\nAluminum alloy glass door\nTechwood grey\n204 H x 75W\nProjection Quantity/Set 500\nZY-2008\nColour Mishan\nJinghe\nStone and tranquility\nZY-2063\nColour Walnut No. 4\nShiyu',
      frText: 'BLM001\nPorte vitrée en alliage d’aluminium\nGris Techwood\n204 H x 75W\nQuantité par ensemble 500\nZY-2008\nCouleur Mishan\nJinghe\nStone and tranquility\nZY-2063\nCouleur Noyer n° 4\nShiyu',
      arText: 'BLM001\nباب زجاجي من سبائك الألمنيوم\nرمادي تيك وود\n204 H x 75W\nالكمية لكل طقم 500\nZY-2008\nلون ميشان\nجينغهه\nZY-2063\nلون الجوز رقم 4\nشيو',
    },
    {
      url: en03.url,
      frUrl: fr03.url,
      width: 1871,
      height: 1323,
      convertedPrices: 0,
      section: designs,
      text: 'ZY-2103\nFrame Anran matte\nZY-2105\nFrame Anran matte\nZY-2106\nFrame Anran matte',
      frText: 'ZY-2103\nCadre Anran mat\nZY-2105\nCadre Anran mat\nZY-2106\nCadre Anran mat',
      arText: 'ZY-2103\nإطار أنران مطفي\nZY-2105\nإطار أنران مطفي\nZY-2106\nإطار أنران مطفي',
    },
  ],
};
