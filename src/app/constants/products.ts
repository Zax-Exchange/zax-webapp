import {createIntl, createIntlCache, RawIntlProvider} from 'react-intl'
import { CreateProjectComponentSpecInput, ProductDimension } from '../../generated/graphql';
import en from "../../translations/en.json";
import zh from "../../translations/zh-cn.json";
import { TranslatableAttribute } from '../../type/common';

const cache = createIntlCache()

const intl = createIntl({
  locale: 'en',
  messages: en
}, cache)

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

export const PRODUCT_NAME_PAPER_TRAY: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.name.paperTray"}),
  value: "Paper Tray"
}
export const PRODUCT_NAME_CORRUGATE_TRAY: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.name.corrugateTray"}),
  value: "Corrugate Tray"
}

export const PRODUCT_NAME_BOOKLET: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.name.booklet"}),
  value: "Booklet"
}

/* Sticker only */
export const PURPOSE_LABELING: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.purpose.labeling"}),
  value: "Labeling"
}

export const PURPOSE_SEALING: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.purpose.sealing"}),
  value: "Sealing"
}

export const SHAPE_SQUARE: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.shape.square"}),
  value: "Square"
}

export const SHAPE_RECTANGLE: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.shape.rectangle"}),
  value: "Rectangle"
}
export const SHAPE_CIRCLE: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.shape.circle"}),
  value: "Circle"
}
export const SHAPE_OVAL: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.shape.oval"}),
  value: "Oval"
}
export const SHAPE_OTHER: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.shape.other"}),
  value: "Irregular"
}

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
export const MATERIAL_DEFAULT_CORRUGATE: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.material.defaultCorrugate"}),
  value: "Default Corrugate"
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

export const MATERIAL_SOURCE_OCC: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.materialSource.occ"}),
  value: "OCC / Recycled Materials"
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

/** Booklet styles */
export const BOOKLET_STYLE_SADDLE_STITCH: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.bookletStyle.saddleStitch"}),
  value: "Saddle Stitch",
  code: "saddle-stitch"
}

export const BOOKLET_STYLE_SEWN_BOUND: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.bookletStyle.sewnBound"}),
  value: "Sewn Bound",
  code: "sewn-bound"
}

export const BOOKLET_STYLE_SPIRAL_BOUND: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.bookletStyle.spiralBound"}),
  value: "Spiral Bound",
  code: "spiral-bound"
}

export const BOOKLET_STYLE_PERFECT_BOUND: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.bookletStyle.perfectBound"}),
  value: "Perfect Bound",
  code: "perfect-bound"
}


/** Box styles */
export const BOX_STYLE_FOLDING_CARTON_RTE: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.boxStyle.rte"}),
  value: "Reverse Tuck End",
  code: "rte"
}

export const BOX_STYLE_FOLDING_CARTON_STE: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.boxStyle.ste"}),
  value: "Straight Tuck End",
  code: "ste"
}

export const BOX_STYLE_FOLDING_CARTON_SEB: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.boxStyle.sealEndBox"}),
  value: "Seal End Box",
  code: "seal-end"
}

export const BOX_STYLE_FOLDING_CARTON_BOX_SLEEVE: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.boxStyle.boxSleeve"}),
  value: "Box Sleeve",
  code: "box-sleeve"
}

export const BOX_STYLE_FOLDING_CARTON_STE_HANG: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.boxStyle.steWithHang"}),
  value: "Straight Tuck End with Hang Tab",
  code: "ste-hang"
}

export const BOX_STYLE_FOLDING_CARTON_STE_SIDE_HANG: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.boxStyle.steWithSideHang"}),
  value: "Straight Tuck End with Side Hang Tab",
  code: "ste-side-hang"
}

export const BOX_STYLE_FOLDING_CARTON_BEER_TRAY: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.boxStyle.beerTray"}),
  value: "Beer Tray with Lid",
  code: "beer-tray"
}

export const BOX_STYLE_FOLDING_CARTON_RTE_FOLDER: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.boxStyle.rteFolder"}),
  value: "Reverse Tuck End Folder Box",
  code: "rte-folder"
}

export const BOX_STYLE_RIGID_BOX_PARTIAL_TELESCOPE: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.boxStyle.partialTelescope"}),
  value: "Partial Telescope",
  code: "p-telescope"
}

export const BOX_STYLE_RIGID_BOX_SHOEBOX: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.boxStyle.shoebox"}),
  value: "Classic Shoebox",
  code: "shoebox"
}

export const BOX_STYLE_RIGID_BOX_FULL_TELESCOPE: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.boxStyle.fullTelescope"}),
  value: "Full Telescope",
  code: "f-telescope"
}

export const BOX_STYLE_RIGID_BOX_CIGAR: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.boxStyle.cigar"}),
  value: "Cigar Box",
  code: "cigar"
}

export const BOX_STYLE_RIGID_BOX_BOOK: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.boxStyle.book"}),
  value: "Book Style",
  code: "book"
}

export const BOX_STYLE_RIGID_BOX_BOOK_MAGNETIC: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.boxStyle.bookMagnetic"}),
  value: "Book Style with Magnetic Closure",
  code: "book-magnetic"
}

export const BOX_STYLE_RIGID_BOX_NECK: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.boxStyle.neck"}),
  value: "Neck Box",
  code: "neck"
}

export const BOX_STYLE_RIGID_BOX_NECK_HINGE: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.boxStyle.neckHinge"}),
  value: "Neck Box with Hinge Cover",
  code: "neck-hinge"
}

export const BOX_STYLE_RIGID_BOX_THREE_SIDE_HINGE: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.boxStyle.threeSideHinge"}),
  value: "Three Sided Hinge Cover",
  code: "three-sided"
}

export const BOX_STYLE_RIGID_BOX_BRIEF_JOINT: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.boxStyle.briefJoint"}),
  value: "Briefcase Style with Joint Cover",
  code: "briefcase-joint"
}

export const BOX_STYLE_RIGID_BOX_BRIEF_NECK: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.boxStyle.briefNeck"}),
  value: "Briefcase Style with Neck Box",
  code: "briefcase-neck"
}

export const BOX_STYLE_RIGID_BOX_TRAY_WITH_SLEEVE: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.boxStyle.trayWithSleeve"}),
  value: "Tray with Sleeve",
  code: "tray-sleeve"
}

export const BOX_STYLE_CORRUGATE_RSC: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.boxStyle.rsc"}),
  value: "Regular Slotted Container",
  code: "slotted-container"
}

export const BOX_STYLE_CORRUGATE_SNAP_TOP_TUCK: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.boxStyle.snapTopTuck"}),
  value: "Snap Lock (1-2-3 Bottom with Top Tuck)",
  code: "snap-tuck"
}

export const BOX_STYLE_CORRUGATE_SNAP_RSC: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.boxStyle.snapRSC"}),
  value: "Snap Lock (1-2-3 Bottom with RSC Top)",
  code: "snap-rsc"
}

export const BOX_STYLE_CORRUGATE_FULL_TELESCOPE: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.boxStyle.fsd"}),
  value: "Full Telescope Design",
  code: "fsd"
}

export const BOX_STYLE_CORRUGATE_ONE_PIECE_FOLDER: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.boxStyle.onePieceFolder"}),
  value: "One Piece Folder",
  code: "opf"
}

export const BOX_STYLE_CORRUGATE_FIVE_PANEL: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.boxStyle.fivePanel"}),
  value: "Five Panel Folder",
  code: "fpf"
}

export const BOX_STYLE_CORRUGATE_REFT: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.boxStyle.reft"}),
  value: "REFT",
  code: "reft"
}

export const BOX_STYLE_CORRUGATE_RETT: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.boxStyle.rett"}),
  value: "RETT",
  code: "rett"
}

export const BOX_STYLE_PAPER_TUBE_CUSTOM_TUBE: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.product.boxStyle.customTubeShape"}),
  value: "Custom Tube Shape",
  code: "custom-tube"
}

/**Color data */

export const COLOR_RED: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.component.attribute.color.red"}),
  value: "Red",
}

export const COLOR_WHITE: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.component.attribute.color.white"}),
  value: "White",
}

export const COLOR_BLACK: TranslatableAttribute = {
  label: intl.formatMessage({id: "app.component.attribute.color.black"}),
  value: "Black",
}


/** Below are combinations of attributes based on different flows/products*/

export const ALL_PRODUCT_NAMES = [
  PRODUCT_NAME_RIGID_BOX,
  PRODUCT_NAME_FOLDING_CARTON,
  PRODUCT_NAME_SLEEVE,
  PRODUCT_NAME_CORRUGATE_BOX,
  PRODUCT_NAME_PAPER_TUBE,
  PRODUCT_NAME_MOLDED_FIBER_TRAY,
  PRODUCT_NAME_PAPER_TRAY,
  PRODUCT_NAME_CORRUGATE_TRAY,
  PRODUCT_NAME_STICKER,
  PRODUCT_NAME_BOOKLET,
]

export const ALL_PRINTING_METHODS = [
  PRINTING_METHOD_DIGITAL,
  PRINTING_METHOD_FLEXO,
  PRINTING_METHOD_LITHO,
  PRINTING_METHOD_SILK_SCREEN
]

export const ALL_COLORS = [
  COLOR_RED,
  COLOR_BLACK,
  COLOR_WHITE
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
  PRODUCT_NAME_PAPER_TRAY,
  PRODUCT_NAME_CORRUGATE_TRAY,
]

export const GUIDED_PROJECT_OTHER_PRODUCTS = [
  PRODUCT_NAME_SLEEVE,
  PRODUCT_NAME_BOOKLET,
  PRODUCT_NAME_STICKER,
]

export const GUIDED_PROJECT_ALL_POST_PROCESS = [
  POST_PROCESS_DEBOSS,
  POST_PROCESS_EMBOSS,
  POST_PROCESS_FOIL_STAMP,
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

/** STICKER DATA */
export const STICKER_PURPOSES = [
  PURPOSE_LABELING,
  PURPOSE_SEALING
]

export const STICKER_SHAPES = [
  SHAPE_RECTANGLE,
  SHAPE_SQUARE,
  SHAPE_CIRCLE,
  SHAPE_OVAL,
  SHAPE_OTHER,
]

/** BOOKLET DATA */
export const BOOKLET_STYLES = [
  BOOKLET_STYLE_PERFECT_BOUND,
  BOOKLET_STYLE_SADDLE_STITCH,
  BOOKLET_STYLE_SEWN_BOUND,
  BOOKLET_STYLE_SPIRAL_BOUND
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

export const RIGID_BOX_BOX_STYLES = [
  BOX_STYLE_RIGID_BOX_BOOK,
  BOX_STYLE_RIGID_BOX_BOOK_MAGNETIC,
  BOX_STYLE_RIGID_BOX_BRIEF_JOINT,
  BOX_STYLE_RIGID_BOX_BRIEF_NECK,
  BOX_STYLE_RIGID_BOX_CIGAR,
  BOX_STYLE_RIGID_BOX_FULL_TELESCOPE,
  BOX_STYLE_RIGID_BOX_NECK,
  BOX_STYLE_RIGID_BOX_NECK_HINGE,
  BOX_STYLE_RIGID_BOX_PARTIAL_TELESCOPE,
  BOX_STYLE_RIGID_BOX_SHOEBOX,
  BOX_STYLE_RIGID_BOX_THREE_SIDE_HINGE,
  BOX_STYLE_RIGID_BOX_TRAY_WITH_SLEEVE
]

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

export const FOLDING_CARTON_BOX_STYLES = [
  BOX_STYLE_FOLDING_CARTON_BEER_TRAY,
  BOX_STYLE_FOLDING_CARTON_BOX_SLEEVE,
  BOX_STYLE_FOLDING_CARTON_RTE,
  BOX_STYLE_FOLDING_CARTON_RTE_FOLDER,
  BOX_STYLE_FOLDING_CARTON_SEB,
  BOX_STYLE_FOLDING_CARTON_STE,
  BOX_STYLE_FOLDING_CARTON_STE_HANG,
  BOX_STYLE_FOLDING_CARTON_STE_SIDE_HANG
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


export const CORRUGATE_BOX_BOX_STYLES = [
  BOX_STYLE_CORRUGATE_FIVE_PANEL,
  BOX_STYLE_CORRUGATE_FULL_TELESCOPE,
  BOX_STYLE_CORRUGATE_ONE_PIECE_FOLDER,
  BOX_STYLE_CORRUGATE_REFT,
  BOX_STYLE_CORRUGATE_RETT,
  BOX_STYLE_CORRUGATE_RSC,
  BOX_STYLE_CORRUGATE_SNAP_RSC,
  BOX_STYLE_CORRUGATE_SNAP_TOP_TUCK
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

export const PAPER_TUBE_BOX_STYLES = [
  BOX_STYLE_PAPER_TUBE_CUSTOM_TUBE
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
  [MATERIAL_DEFAULT_CORRUGATE.value]: MATERIAL_DEFAULT_CORRUGATE,

  [MATERIAL_SOURCE_RECYCLED.value]: MATERIAL_SOURCE_RECYCLED,
  [MATERIAL_SOURCE_FSC.value]: MATERIAL_SOURCE_FSC,
  [MATERIAL_SOURCE_STANDARD.value]: MATERIAL_SOURCE_STANDARD,
  [MATERIAL_SOURCE_OCC.value]: MATERIAL_SOURCE_OCC,

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
  [PRODUCT_NAME_CORRUGATE_TRAY.value]: PRODUCT_NAME_CORRUGATE_TRAY,
  [PRODUCT_NAME_BOOKLET.value]: PRODUCT_NAME_BOOKLET,


  [BOX_STYLE_CORRUGATE_FIVE_PANEL.value]: BOX_STYLE_CORRUGATE_FIVE_PANEL,
  [BOX_STYLE_CORRUGATE_FULL_TELESCOPE.value]: BOX_STYLE_CORRUGATE_FULL_TELESCOPE,
  [BOX_STYLE_CORRUGATE_ONE_PIECE_FOLDER.value]: BOX_STYLE_CORRUGATE_ONE_PIECE_FOLDER,
  [BOX_STYLE_CORRUGATE_REFT.value]: BOX_STYLE_CORRUGATE_REFT,
  [BOX_STYLE_CORRUGATE_RETT.value]: BOX_STYLE_CORRUGATE_RETT,
  [BOX_STYLE_CORRUGATE_RSC.value]: BOX_STYLE_CORRUGATE_RSC,
  [BOX_STYLE_CORRUGATE_SNAP_RSC.value]: BOX_STYLE_CORRUGATE_SNAP_RSC,
  [BOX_STYLE_CORRUGATE_SNAP_TOP_TUCK.value]: BOX_STYLE_CORRUGATE_SNAP_TOP_TUCK,
  [BOX_STYLE_FOLDING_CARTON_BOX_SLEEVE.value]: BOX_STYLE_FOLDING_CARTON_BOX_SLEEVE,
  [BOX_STYLE_FOLDING_CARTON_RTE.value]: BOX_STYLE_FOLDING_CARTON_RTE,
  [BOX_STYLE_FOLDING_CARTON_RTE_FOLDER.value]: BOX_STYLE_FOLDING_CARTON_RTE_FOLDER,
  [BOX_STYLE_FOLDING_CARTON_SEB.value]: BOX_STYLE_FOLDING_CARTON_SEB,
  [BOX_STYLE_FOLDING_CARTON_STE.value]: BOX_STYLE_FOLDING_CARTON_STE,
  [BOX_STYLE_FOLDING_CARTON_BEER_TRAY.value]: BOX_STYLE_FOLDING_CARTON_BEER_TRAY,
  [BOX_STYLE_FOLDING_CARTON_STE_HANG.value]: BOX_STYLE_FOLDING_CARTON_STE_HANG,
  [BOX_STYLE_FOLDING_CARTON_STE_SIDE_HANG.value]: BOX_STYLE_FOLDING_CARTON_STE_SIDE_HANG,
  [BOX_STYLE_PAPER_TUBE_CUSTOM_TUBE.value]: BOX_STYLE_PAPER_TUBE_CUSTOM_TUBE,
  [BOX_STYLE_RIGID_BOX_BOOK.value]: BOX_STYLE_RIGID_BOX_BOOK,
  [BOX_STYLE_RIGID_BOX_BOOK_MAGNETIC.value]: BOX_STYLE_RIGID_BOX_BOOK_MAGNETIC,
  [BOX_STYLE_RIGID_BOX_BRIEF_JOINT.value]: BOX_STYLE_RIGID_BOX_BRIEF_JOINT,
  [BOX_STYLE_RIGID_BOX_BRIEF_NECK.value]: BOX_STYLE_RIGID_BOX_BRIEF_NECK,
  [BOX_STYLE_RIGID_BOX_CIGAR.value]: BOX_STYLE_RIGID_BOX_CIGAR,
  [BOX_STYLE_RIGID_BOX_FULL_TELESCOPE.value]: BOX_STYLE_RIGID_BOX_FULL_TELESCOPE,
  [BOX_STYLE_RIGID_BOX_NECK.value]: BOX_STYLE_RIGID_BOX_NECK,
  [BOX_STYLE_RIGID_BOX_NECK_HINGE.value]: BOX_STYLE_RIGID_BOX_NECK_HINGE,
  [BOX_STYLE_RIGID_BOX_PARTIAL_TELESCOPE.value]: BOX_STYLE_RIGID_BOX_PARTIAL_TELESCOPE,
  [BOX_STYLE_RIGID_BOX_SHOEBOX.value]: BOX_STYLE_RIGID_BOX_SHOEBOX,
  [BOX_STYLE_RIGID_BOX_THREE_SIDE_HINGE.value]: BOX_STYLE_RIGID_BOX_THREE_SIDE_HINGE,
  [BOX_STYLE_RIGID_BOX_TRAY_WITH_SLEEVE.value]: BOX_STYLE_RIGID_BOX_TRAY_WITH_SLEEVE,

  [BOOKLET_STYLE_PERFECT_BOUND.value]: BOOKLET_STYLE_PERFECT_BOUND,
  [BOOKLET_STYLE_SADDLE_STITCH.value]: BOOKLET_STYLE_SADDLE_STITCH,
  [BOOKLET_STYLE_SEWN_BOUND.value]: BOOKLET_STYLE_SEWN_BOUND,
  [BOOKLET_STYLE_SPIRAL_BOUND.value]: BOOKLET_STYLE_SPIRAL_BOUND,

  [SHAPE_RECTANGLE.value]: SHAPE_RECTANGLE,
  [SHAPE_SQUARE.value]: SHAPE_SQUARE,
  [SHAPE_CIRCLE.value]: SHAPE_CIRCLE,
  [SHAPE_OVAL.value]: SHAPE_OVAL,
  [SHAPE_OTHER.value]: SHAPE_OTHER,

  [PURPOSE_LABELING.value]: PURPOSE_LABELING,
  [PURPOSE_SEALING.value]: PURPOSE_SEALING,

  [COLOR_RED.value]: COLOR_RED,
  [COLOR_BLACK.value]:   COLOR_BLACK,
  [COLOR_WHITE.value]:   COLOR_WHITE
}


/** Product default spec data */

export const DEFAULT_RIGID_BOX_SPEC: CreateProjectComponentSpecInput = {
  productName: PRODUCT_NAME_RIGID_BOX.value,
  dimension: {
    x: "",
    y: "",
    z: ""
  },
  includeArtworkInQuote: false,
  boxStyle: "",
  thickness: "",
  outsideMaterial: "",
  outsideMaterialSource: "",
  outsideFinish: "",
  postProcess: [],
  insideMaterial: "",
  insideMaterialSource: "",
  insideFinish: "",
}

export const DEFAULT_FOLDING_CARTON_SPEC: CreateProjectComponentSpecInput = {
  productName: PRODUCT_NAME_FOLDING_CARTON.value,
  dimension: {
    x: "",
    y: "",
    z: ""
  },
  includeArtworkInQuote: false,
  boxStyle: "",
  thickness: "",
  material: "",
  materialSource: "",
  outsideFinish: "",
  postProcess: [],
  insideFinish: "",
}

export const DEFAULT_SLEEVE_SPEC: CreateProjectComponentSpecInput = {
  productName: PRODUCT_NAME_SLEEVE.value,
  dimension: {
    x: "",
    y: "",
    z: ""
  },
  includeArtworkInQuote: false,
  boxStyle: "",
  thickness: "",
  material: "",
  materialSource: "",
  outsideFinish: "",
  postProcess: [],
  insideFinish: "",
}

export const DEFAULT_CORRUGATE_BOX_SPEC: CreateProjectComponentSpecInput = {
  productName: PRODUCT_NAME_CORRUGATE_BOX.value,
  dimension: {
    x: "",
    y: "",
    z: ""
  },
  includeArtworkInQuote: false,
  boxStyle: "",
  thickness: "",
  flute: "",
  material: MATERIAL_DEFAULT_CORRUGATE.value,
  materialSource: MATERIAL_SOURCE_OCC.value,
  outsideFinish: "",
  postProcess: [],
  insideFinish: "",
}

export const DEFAULT_PAPER_TUBE_SPEC: CreateProjectComponentSpecInput = {
  productName: PRODUCT_NAME_PAPER_TUBE.value,
  dimension: {
    x: "",
    y: "",
    z: ""
  },
  includeArtworkInQuote: false,
  boxStyle: BOX_STYLE_PAPER_TUBE_CUSTOM_TUBE.value,
  thickness: "",
  postProcess: [],
  outsideMaterial: "",
  outsideMaterialSource: "",
  outsideFinish: "",
}

export const DEFAULT_MOLDED_FIBER_TRAY_SPEC: CreateProjectComponentSpecInput = {
  productName: PRODUCT_NAME_MOLDED_FIBER_TRAY.value,
  dimension: {
    x: "",
    y: "",
    z: ""
  },
  includeArtworkInQuote: false,
  thickness: "",
  color: "",
  manufacturingProcess: "",
  materialSource: "",
  postProcess: [],
}

export const DEFAULT_PAPER_TRAY_SPEC: CreateProjectComponentSpecInput = {
  productName: PRODUCT_NAME_PAPER_TRAY.value,
  dimension: {
    x: "",
    y: "",
    z: ""
  },
  includeArtworkInQuote: false,
}

export const DEFAULT_CORRUGATE_TRAY_SPEC: CreateProjectComponentSpecInput = {
  productName: PRODUCT_NAME_CORRUGATE_TRAY.value,
  dimension: {
    x: "",
    y: "",
    z: ""
  },
}

export const DEFAULT_STICKER_SPEC: CreateProjectComponentSpecInput = {
   productName: PRODUCT_NAME_STICKER.value,
  dimension: {
    x: "",
    y: "",
  },
  purpose: "",
  shape: "",
  includeArtworkInQuote: false,

}

export const DEFAULT_BOOKLET_SPEC: CreateProjectComponentSpecInput = {
  productName: PRODUCT_NAME_BOOKLET.value,
  dimension: {
    x: "",
    y: "",
    z: "",
  },
  numberOfPages: "",
  style: ""
}

