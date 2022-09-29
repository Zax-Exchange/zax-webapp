import {createIntl, createIntlCache, RawIntlProvider} from 'react-intl'
import en from "../../translations/en.json";
import zh from "../../translations/zh-cn.json";
import { TranslatableAttribute } from '../../type/common';

const cache = createIntlCache()

const intl = createIntl({
  locale: 'en',
  messages: en
}, cache)

/* For corrugate box only */
export const A_FLUTE: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.flute.aFlute"}),
  value: "A Flute"
}
export const B_FLUTE: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.flute.bFlute"}),
  value: "B Flute"
}
export const C_FLUTE: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.flute.cFlute"}),
  value: "C Flute"
}
export const E_FLUTE: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.flute.eFlute"}),
  value: "E Flute"
}
export const F_FLUTE: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.flute.fFlute"}),
  value: "F Flute"
}

export const PRINTING_METHOD_DIGITAL: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.printinMethod.digital"}),
  value: "Digital"
}
export const PRINTING_METHOD_SILK_SCREEN: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.printinMethod.silkScreen"}),
  value: "Silk Screen"
}
export const PRINTING_METHOD_LITHO: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.printinMethod.litho"}),
  value: "Litho"
}
export const PRINTING_METHOD_FLEXO: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.printinMethod.flexo"}),
  value: "Flexo"
}

/* For molded fiber only */
export const MANUFACTURING_PROCESS_WET_PRESS: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.manufacturingProcess.wetPress"}),
  value: "Wet Press"
}

export const MANUFACTURING_PROCESS_DRY_PRESS: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.manufacturingProcess.dryPress"}),
  value: "Dry Press"
}


/** Common attributes */
export const MATERIAL_SBS: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.material.sbs"}),
  value: "SBS"
}
export const MATERIAL_C2S: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.material.c2s"}),
  value: "C2S"
}
export const MATERIAL_C1S: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.material.c1s"}),
  value: "C1S"
}
export const MATERIAL_UNCOATED_PAPER: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.material.uncoatedPaper"}),
  value: "Uncoated Paper"
}

export const MATERIAL_SOURCE_STANDARD: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.materialSource.standard"}),
  value: "Standard"
}
export const MATERIAL_SOURCE_RECYCLED: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.materialSource.recycled"}),
  value: "Recycled"
}
export const MATERIAL_SOURCE_FSC: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.materialSource.fsc"}),
  value: "FSC"
}


export const POST_PROCESS_PRINTING: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.postProcess.printing"}),
  value: "Printing"
}
export const POST_PROCESS_EMBOSS: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.postProcess.emboss"}),
  value: "Emboss"
}
export const POST_PROCESS_DEBOSS: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.postProcess.deboss"}),
  value: "Deboss"
}
export const POST_PROCESS_FOIL_STAMP: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.postProcess.foilStamp"}),
  value: "Foil Stamp"
}


export const FINISH_MATTE: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.finish.matte"}),
  value: "Matte"
}
export const FINISH_GLOSS: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.finish.gloss"}),
  value: "Gloss"
}
export const FINISH_UNCOATED: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.finish.uncoated"}),
  value: "Uncoated"
}


/** Product names */
export const PRODUCT_NAME_RIGID_BOX: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.name.rigidBox"}),
  value: "Rigid Box"
}
export const PRODUCT_NAME_FOLDING_CARTON: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.name.foldingCarton"}),
  value: "Folding Carton"
}
export const PRODUCT_NAME_SLEEVE: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.name.sleeve"}),
  value: "Sleeve"
}
export const PRODUCT_NAME_CORRUGATE_BOX: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.name.corrugateBox"}),
  value: "Corrugate Box"
}
export const PRODUCT_NAME_PAPER_TUBE: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.name.paperTube"}),
  value: "Paper Tube"
}
export const PRODUCT_NAME_STICKER: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.name.sticker"}),
  value: "Sticker"
}
export const PRODUCT_NAME_PRINTING: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.name.printing"}),
  value: "Printing"
}
export const PRODUCT_NAME_MOLDED_FIBER_TRAY: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.name.moldedFiberTray"}),
  value: "Molded Fiber Tray"
}
export const PRODUCT_NAME_PLASTIC_TRAY: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.name.plasticTray"}),
  value: "Plastic Tray"
}
export const PRODUCT_NAME_PAPER_TRAY: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.name.paperTray"}),
  value: "Paper Tray"
}
export const PRODUCT_NAME_CORRUGATE_TRAY: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.name.corrugateTray"}),
  value: "Corrugate Tray"
}

// export const BOX_STYLE_SHOULDER: TranslatableAttribute = {
//   label: intl.formatMessage({id: "app.boxStyle.shoulder"}),
//   value: "Shoulder Style"
// }

// export const BOX_STYLE_BOOK: TranslatableAttribute = {
//   label: intl.formatMessage({id: "app.boxStyle.book"}),
//   value: "Book Style"
// }

export const ALL_PRODUCT_NAMES = [
  PRODUCT_NAME_RIGID_BOX,
  PRODUCT_NAME_FOLDING_CARTON,
  PRODUCT_NAME_SLEEVE,
  PRODUCT_NAME_CORRUGATE_BOX,
  PRODUCT_NAME_PAPER_TUBE,
  PRODUCT_NAME_MOLDED_FIBER_TRAY,
  PRODUCT_NAME_PLASTIC_TRAY,
  PRODUCT_NAME_PAPER_TRAY,
  PRODUCT_NAME_CORRUGATE_TRAY,
  PRODUCT_NAME_STICKER,
  PRODUCT_NAME_PRINTING,
]

// Guided Project Creation data
export const GUIDED_PROJECT_OUTSIDE_PRODUCTS = [
  PRODUCT_NAME_RIGID_BOX,
  PRODUCT_NAME_FOLDING_CARTON,
  PRODUCT_NAME_CORRUGATE_BOX,
  PRODUCT_NAME_PAPER_TUBE,
]

export const GUIDED_PROJECT_INSIDE_PRODUCTS = [
  PRODUCT_NAME_MOLDED_FIBER_TRAY,
  PRODUCT_NAME_PLASTIC_TRAY,
  PRODUCT_NAME_PAPER_TRAY,
  PRODUCT_NAME_CORRUGATE_TRAY,
]

export const GUIDED_PROJECT_ALL_POST_PROCESS = [
  POST_PROCESS_DEBOSS,
  POST_PROCESS_EMBOSS,
  POST_PROCESS_FOIL_STAMP,
  POST_PROCESS_PRINTING
]

export const GUIDED_PROJECT_PAPER_POST_PROCESS = [
    POST_PROCESS_FOIL_STAMP,
  POST_PROCESS_PRINTING
]

export const GUIDED_PROJECT_FINISH = [
  FINISH_GLOSS,
  FINISH_MATTE,
  FINISH_UNCOATED
]

/** RIGID BOX DATA */
export const RIGID_BOX_MATERIALS = [
  MATERIAL_C1S,
  MATERIAL_C2S,
  MATERIAL_SBS,
  MATERIAL_UNCOATED_PAPER
]

export const RIGID_BOX_MATERIAL_SOURCES = [
  MATERIAL_SOURCE_FSC,
  MATERIAL_SOURCE_RECYCLED,
  MATERIAL_SOURCE_STANDARD,
]

export const RIGID_BOX_POST_PROCESSES = [
  POST_PROCESS_DEBOSS,
  POST_PROCESS_EMBOSS,
  POST_PROCESS_FOIL_STAMP,
  POST_PROCESS_PRINTING
]

export const RIGID_BOX_FINISHES = [
  FINISH_GLOSS,
  FINISH_MATTE,
  FINISH_UNCOATED
]

// export const RIGID_BOX_STYLES = [
//   BOX_STYLE_SHOULDER,
//   BOX_STYLE_BOOK
// ]

/** FOLDING CARTON DATA */
export const FOLDING_CARTON_MATERIALS = [
    MATERIAL_C1S,
  MATERIAL_C2S,
  MATERIAL_SBS,
  MATERIAL_UNCOATED_PAPER
]

export const FOLDING_CARTON_MATERIAL_SOURCES = [
  MATERIAL_SOURCE_FSC,
  MATERIAL_SOURCE_RECYCLED,
  MATERIAL_SOURCE_STANDARD,
]

export const FOLDING_CARTON_POST_PROCESSES = [
  POST_PROCESS_DEBOSS,
  POST_PROCESS_EMBOSS,
  POST_PROCESS_FOIL_STAMP,
  POST_PROCESS_PRINTING
]

export const FOLDING_CARTON_FINISHES = [
  FINISH_GLOSS,
  FINISH_MATTE,
  FINISH_UNCOATED
]

/** SLEEVE DATA */

export const SLEEVE_MATERIALS = [
      MATERIAL_C1S,
  MATERIAL_C2S,
  MATERIAL_SBS,
  MATERIAL_UNCOATED_PAPER
]

export const SLEEVE_MATERIAL_SOURCES = [
    MATERIAL_SOURCE_FSC,
  MATERIAL_SOURCE_RECYCLED,
  MATERIAL_SOURCE_STANDARD,
]

export const SLEEVE_POST_PROCESSES = [
    POST_PROCESS_DEBOSS,
  POST_PROCESS_EMBOSS,
  POST_PROCESS_FOIL_STAMP,
  POST_PROCESS_PRINTING
]

export const SLEEVE_FINISHES = [
  FINISH_GLOSS,
  FINISH_MATTE,
  FINISH_UNCOATED
]

/** CORRUGATE DATA */
export const CORRUGATE_BOX_POST_PROCESSES = [
      POST_PROCESS_DEBOSS,
  POST_PROCESS_EMBOSS,
  POST_PROCESS_PRINTING
]

export const CORRUGATE_BOX_FINISHES = [
  FINISH_GLOSS,
  FINISH_MATTE,
  FINISH_UNCOATED
]

export const CORRUGATE_BOX_FLUTES = [
  A_FLUTE,
  B_FLUTE,
  C_FLUTE,
  E_FLUTE,
  F_FLUTE
]

export const CORRUGATE_BOX_PRINTING_METHODS = [
  PRINTING_METHOD_DIGITAL,
  PRINTING_METHOD_FLEXO,
  PRINTING_METHOD_LITHO,
  PRINTING_METHOD_SILK_SCREEN
]

/** MOLDED FIBER DATA */
export const MOLDED_FIBER_MANUFACTURING_PROCESSES = [
  MANUFACTURING_PROCESS_DRY_PRESS,
  MANUFACTURING_PROCESS_WET_PRESS
]

export const MOLDED_FIBER_MATERIAL_SOURCES = [
  MATERIAL_SOURCE_FSC,
  MATERIAL_SOURCE_RECYCLED,
  MATERIAL_SOURCE_STANDARD
]

export const MOLDED_FIBER_POST_PROCESSES = [
  POST_PROCESS_DEBOSS,
  POST_PROCESS_EMBOSS,
  POST_PROCESS_PRINTING,
  POST_PROCESS_FOIL_STAMP
]

/** PAPER TUBE DATA */

export const PAPER_TUBE_MATERIALS = [
  MATERIAL_C1S,
  MATERIAL_C2S,
  MATERIAL_SBS,
]

export const PAPER_TUBE_MATERIAL_SOURCES = [
    MATERIAL_SOURCE_FSC,
  MATERIAL_SOURCE_RECYCLED,
  MATERIAL_SOURCE_STANDARD
]

export const PAPER_TUBE_POST_PROCESSES = [
    POST_PROCESS_DEBOSS,
  POST_PROCESS_EMBOSS,
  POST_PROCESS_PRINTING,
  POST_PROCESS_FOIL_STAMP
]

export const PAPER_TUBE_FINISHES = [
  FINISH_GLOSS,
  FINISH_MATTE,
  FINISH_UNCOATED
]

// Plastic Tray Data
export const PLASTIC_TRAY_POST_PROCESS = [
  POST_PROCESS_EMBOSS,
  POST_PROCESS_DEBOSS
]

// Paper Tray Data
export const PAPER_TRAY_POST_PROCESS = [
    POST_PROCESS_EMBOSS,
  POST_PROCESS_DEBOSS,
  POST_PROCESS_PRINTING,
  POST_PROCESS_FOIL_STAMP
]

// Molded Fiber Tray Data
export const MOLDED_FIBER_TRAY_POST_PROCESS = [
    POST_PROCESS_EMBOSS,
  POST_PROCESS_DEBOSS,

]

// Corrugate Tray Data
export const CORRUGATE_TRAY_POST_PROCESS = [
    POST_PROCESS_EMBOSS,
  POST_PROCESS_DEBOSS,
  POST_PROCESS_PRINTING,
  POST_PROCESS_FOIL_STAMP
]

// This converts from value of a particular product/component attribute to a TranslatableAttribute
// so that we can translate project/component attribute when retrieved from backend
export const productValueToLabelMap: Record<string, TranslatableAttribute> = {
  [A_FLUTE.value]: A_FLUTE,
  [B_FLUTE.value]: B_FLUTE,
  [C_FLUTE.value]: C_FLUTE,
  [E_FLUTE.value]: E_FLUTE,
  [F_FLUTE.value]: F_FLUTE,

  [PRINTING_METHOD_DIGITAL.value]: PRINTING_METHOD_DIGITAL,
  [PRINTING_METHOD_SILK_SCREEN.value]: PRINTING_METHOD_SILK_SCREEN,
  [PRINTING_METHOD_LITHO.value]: PRINTING_METHOD_LITHO,
  [PRINTING_METHOD_FLEXO.value]: PRINTING_METHOD_FLEXO,
  
  [MANUFACTURING_PROCESS_WET_PRESS.value]: MANUFACTURING_PROCESS_WET_PRESS,
  [MANUFACTURING_PROCESS_DRY_PRESS.value]: MANUFACTURING_PROCESS_DRY_PRESS,

  [MATERIAL_SBS.value]: MATERIAL_SBS,
  [MATERIAL_C2S.value]: MATERIAL_C2S,
  [MATERIAL_C1S.value]: MATERIAL_C1S,
  [MATERIAL_UNCOATED_PAPER.value]: MATERIAL_UNCOATED_PAPER,
  
  [MATERIAL_SOURCE_RECYCLED.value]: MATERIAL_SOURCE_RECYCLED,
  [MATERIAL_SOURCE_FSC.value]: MATERIAL_SOURCE_FSC,
  [MATERIAL_SOURCE_STANDARD.value]: MATERIAL_SOURCE_STANDARD,

  [POST_PROCESS_PRINTING.value]: POST_PROCESS_PRINTING,
  [POST_PROCESS_EMBOSS.value]: POST_PROCESS_EMBOSS,
  [POST_PROCESS_DEBOSS.value]: POST_PROCESS_DEBOSS,
  [POST_PROCESS_FOIL_STAMP.value]: POST_PROCESS_FOIL_STAMP,
  
  [FINISH_MATTE.value]: FINISH_MATTE,
  [FINISH_GLOSS.value]: FINISH_GLOSS,
  [FINISH_UNCOATED.value]: FINISH_UNCOATED,

  [PRODUCT_NAME_RIGID_BOX.value]: PRODUCT_NAME_RIGID_BOX,
  [PRODUCT_NAME_FOLDING_CARTON.value]: PRODUCT_NAME_FOLDING_CARTON,
  [PRODUCT_NAME_SLEEVE.value]: PRODUCT_NAME_SLEEVE,
  [PRODUCT_NAME_CORRUGATE_BOX.value]: PRODUCT_NAME_CORRUGATE_BOX,
  [PRODUCT_NAME_PAPER_TUBE.value]: PRODUCT_NAME_PAPER_TUBE,
  [PRODUCT_NAME_STICKER.value]: PRODUCT_NAME_STICKER,
  [PRODUCT_NAME_PRINTING.value]: PRODUCT_NAME_PRINTING,
  [PRODUCT_NAME_MOLDED_FIBER_TRAY.value]: PRODUCT_NAME_MOLDED_FIBER_TRAY,
  [PRODUCT_NAME_PAPER_TRAY.value]: PRODUCT_NAME_PAPER_TRAY,
  [PRODUCT_NAME_PLASTIC_TRAY.value]: PRODUCT_NAME_PLASTIC_TRAY,
  [PRODUCT_NAME_CORRUGATE_TRAY.value]: PRODUCT_NAME_CORRUGATE_TRAY,

  // [BOX_STYLE_SHOULDER.value]: BOX_STYLE_SHOULDER,
  // [BOX_STYLE_BOOK.value]: BOX_STYLE_BOOK
}