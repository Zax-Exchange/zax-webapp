
/* For corrugate box only */
export const A_FLUTE = "A Flute";
export const B_FLUTE = "B Flute"
export const C_FLUTE = "C Flute"
export const E_FLUTE = "E Flute"
export const F_FLUTE = "F Flute"

export const PRINTING_METHOD_DIGITAL = "Digital"
export const PRINTING_METHOD_SILK_SCREEN = "Silk Screen"
export const PRINTING_METHOD_LITHO = "Litho"
export const PRINTING_METHOD_FLEXO = "Flexo"

/* For molded fiber only */
export const MANUFACTURING_PROCESS_WET_PRESS = "Wet Press"
export const MANUFACTURING_PROCESS_SEMI_WET_PRESS = "Semi Wet Press"
export const MANUFACTURING_PROCESS_DRY_PRESS = "Dry Press"


/** Common attributes */
export const MATERIAL_SBS = "SBS"
export const MATERIAL_C2S = "C2S"
export const MATERIAL_C1S = "C1S"
export const MATERIAL_UNCOATED_PAPER = "Uncoated Paper";

export const MATERIAL_SOURCE_STANDARD = "Standard";
export const MATERIAL_SOURCE_RECYCLED = "Recycled"
export const MATERIAL_SOURCE_FSC = "FSC"


export const POST_PROCESS_PRINTING = "Printing"
export const POST_PROCESS_EMBOSS = "Emboss"
export const POST_PROCESS_DEBOSS = "Deboss"
export const POST_PROCESS_FOIL_STAMP = "Foil Stamp"


export const FINISH_MATTE = "Matte"
export const FINISH_GLOSS = "Gloss"
export const FINISH_UNCOATED = "Uncoated"


/** Product names */
export const PRODUCT_NAME_RIGID_BOX = "Rigid Box"
export const PRODUCT_NAME_FOLDING_CARTON = "Folding Carton"
export const PRODUCT_NAME_SLEEVE = "Sleeve"
export const PRODUCT_NAME_CORRUGATE_BOX = "Corrugate Box"
export const PRODUCT_NAME_MOLDED_FIBER = "Molded Fiber"
export const PRODUCT_NAME_PAPER_TUBE = "Paper Tube"
export const PRODUCT_NAME_STICKER = "Sticker"
export const PRODUCT_NAME_PRINTING = "Printing"

/** For add component modal dropdown */
export const PRODUCT_NAMES = [
  PRODUCT_NAME_RIGID_BOX,
  PRODUCT_NAME_FOLDING_CARTON,
  PRODUCT_NAME_SLEEVE,
  PRODUCT_NAME_CORRUGATE_BOX,
  PRODUCT_NAME_MOLDED_FIBER,
  PRODUCT_NAME_PAPER_TUBE,
  PRODUCT_NAME_STICKER,
  PRODUCT_NAME_PRINTING
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
  MANUFACTURING_PROCESS_SEMI_WET_PRESS,
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