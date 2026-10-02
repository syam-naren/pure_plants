import type { CatalogueProduct } from "~/data/nursery";
import researchedProductDetails from "~/data/productDetails.json";

export type ProductHorticultureDetails = {
  lifespan: string | null;
  foliage: string | null;
  matureHeight: string | null;
  shape: string | null;
  light: string | null;
  watering: string | null;
  growthRate: string | null;
  soil: string | null;
  floweringOrFruiting: string | null;
  sources: readonly {
    title: string;
    url: string;
  }[];
};

const completeProductDetails = researchedProductDetails satisfies Record<
  CatalogueProduct["slug"],
  ProductHorticultureDetails
>;

export const productDetails: Readonly<
  Partial<Record<string, ProductHorticultureDetails>>
> = completeProductDetails;
