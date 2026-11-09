import en01 from './lb-doors/lb-doors-01-en.jpg.asset.json';
import fr01 from './lb-doors/lb-doors-01-fr.jpg.asset.json';
import en02 from './lb-doors/lb-doors-02-en.jpg.asset.json';
import fr02 from './lb-doors/lb-doors-02-fr.jpg.asset.json';
import en03 from './lb-doors/lb-doors-03-en.jpg.asset.json';
import fr03 from './lb-doors/lb-doors-03-fr.jpg.asset.json';
import en04 from './lb-doors/lb-doors-04-en.jpg.asset.json';
import fr04 from './lb-doors/lb-doors-04-fr.jpg.asset.json';
import en05 from './lb-doors/lb-doors-05-en.jpg.asset.json';
import fr05 from './lb-doors/lb-doors-05-fr.jpg.asset.json';
import en06 from './lb-doors/lb-doors-06-en.jpg.asset.json';
import fr06 from './lb-doors/lb-doors-06-fr.jpg.asset.json';
import en07 from './lb-doors/lb-doors-07-en.jpg.asset.json';
import fr07 from './lb-doors/lb-doors-07-fr.jpg.asset.json';
import en08 from './lb-doors/lb-doors-08-en.jpg.asset.json';
import fr08 from './lb-doors/lb-doors-08-fr.jpg.asset.json';

const wooden = { fr: 'Portes en bois', en: 'Wooden doors', ar: 'أبواب خشبية' };
const aluminium = { fr: 'Porte vitrée en aluminium', en: 'Aluminium glass door', ar: 'باب زجاجي من الألمنيوم' };
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
      text: 'SPSDM001\nSolid Wood Gate\nTechwood grey\n204H X 95 W\nProjection Quantity/Set 500\nDoor core\nLock and hardware set\nRough opening size\nFrame size\nLeaf size',
      frText: 'SPSDM001\nPorte en bois massif\nGris Techwood\n204H X 95 W\nQuantité projetée par ensemble 500\nÂme de porte\nSerrure et quincaillerie\nOuverture brute\nCadre\nVantail',
      arText: 'SPSDM001\nباب من الخشب المصمت\nرمادي تيك وود\n204H X 95 W\nالكمية المتوقعة لكل طقم 500\nحشوة الباب\nالقفل ومجموعة الإكسسوارات\nمقاس الفتحة الخام\nمقاس الإطار\nمقاس الضلفة',
    },
    {
      url: en02.url,
      frUrl: fr02.url,
      width: 1871,
      height: 1323,
      convertedPrices: 0,
      section: wooden,
      text: 'SPSFJM001\nHoneycomb paper inside Gate\nTechwood grey\n204 H X 85W\nProjection Quantity/Set 1500\nHoneycomb paper core\nLock and hardware set\nRough opening size\nFrame size\nLeaf size',
      frText: 'SPSFJM001\nPorte avec âme en nid d’abeille\nGris Techwood\n204 H X 85W\nQuantité projetée par ensemble 1500\nÂme en nid d’abeille\nSerrure et quincaillerie\nOuverture brute\nCadre\nVantail',
      arText: 'SPSFJM001\nباب بحشوة ورقية على شكل خلية نحل\nرمادي تيك وود\n204 H X 85W\nالكمية المتوقعة لكل طقم 1500\nحشوة ورقية على شكل خلية نحل\nالقفل ومجموعة الإكسسوارات\nمقاس الفتحة الخام\nمقاس الإطار\nمقاس الضلفة',
    },
    {
      url: en03.url,
      frUrl: fr03.url,
      width: 1871,
      height: 1323,
      convertedPrices: 0,
      section: aluminium,
      text: 'BLM001\nAluminum alloy glass door\nTechwood grey\n204 H x 75W\nProjection Quantity/Set 500\nHoneycomb paper core\nLock and hardware set\nRough opening size\nFrame size\nLeaf size',
      frText: 'BLM001\nPorte vitrée en alliage d’aluminium\nGris Techwood\n204 H x 75W\nQuantité projetée par ensemble 500\nÂme en nid d’abeille\nSerrure et quincaillerie\nOuverture brute\nCadre\nVantail',
      arText: 'BLM001\nباب زجاجي من سبائك الألمنيوم\nرمادي تيك وود\n204 H x 75W\nالكمية المتوقعة لكل طقم 500\nحشوة ورقية على شكل خلية نحل\nالقفل ومجموعة الإكسسوارات\nمقاس الفتحة الخام\nمقاس الإطار\nمقاس الضلفة',
    },
    {
      url: en04.url,
      frUrl: fr04.url,
      width: 1871,
      height: 1323,
      convertedPrices: 0,
      section: designs,
      text: 'ZY-2008\nDoor design\nColour Mishan\nAssociated finish Jinghe\nStone and tranquility',
      frText: 'ZY-2008\nModèle de porte\nCouleur Mishan\nFinition associée Jinghe\nStone and tranquility',
      arText: 'ZY-2008\nتصميم باب\nلون ميشان\nالتشطيب المرفق جينغهه\nStone and tranquility',
    },
    {
      url: en05.url,
      frUrl: fr05.url,
      width: 1871,
      height: 1323,
      convertedPrices: 0,
      section: designs,
      text: 'ZY-2063\nDoor design\nColour Walnut No. 4\nAssociated finish Shiyu',
      frText: 'ZY-2063\nModèle de porte\nCouleur Noyer n° 4\nFinition associée Shiyu',
      arText: 'ZY-2063\nتصميم باب\nلون الجوز رقم 4\nالتشطيب المرفق شيو',
    },
    {
      url: en06.url,
      frUrl: fr06.url,
      width: 1871,
      height: 1323,
      convertedPrices: 0,
      section: designs,
      text: 'ZY-2103\nDoor design\nFrame Anran matte\nFinish Anran matte',
      frText: 'ZY-2103\nModèle de porte\nCadre Anran mat\nFinition Anran mat',
      arText: 'ZY-2103\nتصميم باب\nإطار أنران مطفي\nتشطيب أنران مطفي',
    },
    {
      url: en07.url,
      frUrl: fr07.url,
      width: 1871,
      height: 1323,
      convertedPrices: 0,
      section: designs,
      text: 'ZY-2105\nDoor design\nFrame Anran matte\nFinish Anran matte',
      frText: 'ZY-2105\nModèle de porte\nCadre Anran mat\nFinition Anran mat',
      arText: 'ZY-2105\nتصميم باب\nإطار أنران مطفي\nتشطيب أنران مطفي',
    },
    {
      url: en08.url,
      frUrl: fr08.url,
      width: 1871,
      height: 1323,
      convertedPrices: 0,
      section: designs,
      text: 'ZY-2106\nDoor design\nFrame Anran matte\nFinish Anran matte',
      frText: 'ZY-2106\nModèle de porte\nCadre Anran mat\nFinition Anran mat',
      arText: 'ZY-2106\nتصميم باب\nإطار أنران مطفي\nتشطيب أنران مطفي',
    },
  ],
};
