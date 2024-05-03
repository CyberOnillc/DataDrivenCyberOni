import {
  Blog,
  BlogCategory,
  BlogComment,
  BlogLike,
  CaseStudy,
  Discount,
  EventStatus,
  GptPrompt,
  Image,
  PricingModel,
  ProductStatus,
  Review,
  Role,
  Service,
  ServiceCart,
  ServiceCartItem,
  ServiceDescription,
  SubService,
  Supplier,
  Tag,
  User,
} from "@prisma/client";
import { UserPersona } from "./casestudy";

export type CreateCategory = {
  id?: string;
  name: string;  
  children: {name:string, id?:string} []
}
export type CreateBlogDTO = {
  title: string;
  subTitle: string;
  description: string;
  featured: boolean;
  date: Date;
  publishDate: Date;
  content: string;
  templateId?: string;
  author: { id?: string; email: string };
  images: CreateImageDTO[];
  tags: CreateTagDTO[];
};

export type DisplayBlogDTO = Blog & {
  author: User & { image: Image };
  tags: Tag[];
  images: Image[];
  Comments: DisplayCommentDTO[];
  Likes: BlogLike[];
  category?: BlogCategory
  _count: {
    Likes: number;
  };
};

export type CreateImageDTO = {
  id?: string | undefined;
  name?: string | undefined | null;
  src: string;
};
export type CreateServiceDTO = {
  title: string;
  previewContent: string;
  featured: boolean;
  ServiceDescription: CreateServiceDescription[];
  hourlyRate: number;
  valueBrought: string[];
  skillsUsed: string[];
  htmlEmbed?: string;
  image?: CreateImageDTO;
  SubServices?: CreateSubServiceDTO[];
  tags?: CreateTagDTO[];
  faqs?: CreateFaqDTO[];
};

export type CreateServiceDescription = {
  id?: string;
  title: string;
  content: string;
  imageOnLeft: boolean;
  image: CreateImageDTO;
};
export type CreateFaqDTO = {
  question: string;
  answer: string;
};

export type DisplayServiceDTO = Service & {
  image?: Image | null;
  tags?: Tag[];
  SubServices?: DisplaySubServiceDTO[];
  ServiceDescription?: (ServiceDescription & { image: Image })[];
};
export type DisplaySubServiceDTO = SubService & {
  image?: Image | null;
  CaseStudies: CaseStudy[];
};
export type CreateSubServiceDTO = {
  id?: string;
  title: string;
  pricingModel: PricingModel;
  serviceDeliverables: string[];
  serviceUsageScore: number;
  description: string;
  department: string;
  estimated_hours_times_fifty_percent: number;
  estimated_hours_times_one_hundred_percent: number;
  overheadCost: number;
  complexity: number;
  skillLevel: string;
  image?: CreateImageDTO;
  tags?: CreateTagDTO[];
};

export type CommentDTO = {
  comment: string;
  blogId: string;
  email: string;
};

export type DisplayCommentDTO = BlogComment & {
  User: User;
};

export type CreateUserDTO = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  image?: CreateImageDTO;
  address?: CreateAddressDTO;
  password?: string;
  role: Role;
};

export type DisplayUserDTO = {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  emailVerified?: Date;
  role: Role;
  image?: Image | null;
};
export type CreateAddressDTO = {
  id?: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

export type CredentialAuthDTO = {
  email: string;
  password: string;
};

export type CreateEventDTO = {
  name: string;
  date: Date;
  location: string;
  description: string;
  image: CreateImageDTO[];
  tags: CreateTagDTO[];
  eventLink: string;
  status: EventStatus;
  isVirtual: boolean;
};

export type CreateTagDTO = {
  id?: string;
  name: string;
};

export type CreateOrderDTO = {
  productId: string;
  userEmail: string;
  address: CreateAddressDTO | string;
};
export type ProductCartItemDTO = {
  quantity: number;
  productId: string;
  sessionId: string;
  userId: string;
};

export type DisplayServiceCartDTO = ServiceCart & {
  items: DisplayServiceCartItemDTO[];
  discounts: Discount[]
};
export type CreateServicePaymentDTO = {
  paymentId: string;
  cartId: string;
};
export type CreateServiceCartItemDTO = {
  userId: string;
  serviceId: string;
  description: string | null;
  addons: {
    id: string;
  }[];
};

export type UpdateServiceCartItemDTO = {
  cartItemId: string;
  userId: string | null;
  description: string | null;
  addons: {
    id: string;
  }[];
};
export type RemoveServiceCartItem = {
  cartItemId: string;
};

export type DisplayServiceCartItemDTO = ServiceCartItem & {
  service:
    | (Service & {
        image?: Image;
      })
    | null;
  addons: DisplaySubServiceDTO[];
};
export type CreateCaseStudy = {
  id?: string;
  title: string;
  serviceId?: string | null;
  subServices: { id: string }[];
  preview: string;
  problemStatement: string;
  userProblems: string[]; //comma seaprated
  possibleSolutions: string[]; //comma seaprated
  goals: string[]; //comma seaprated
  images: CreateImageDTO[];
  uniqueFeatures: string;
  userResearch: string;
  keyLearning: string;
  userPersonas: UserPersona[];
  competetiveAnalysis: CreateImageDTO[];
  wireFrames?: CreateImageDTO[];
  hifiDesign?: CreateImageDTO[];
  userFlow?: CreateImageDTO[];
  architecture?: CreateImageDTO[];
};

export type CreateDiscountDTO = {
  id?: string;
  name: string;
  value: number;
  expires?: Date;
};


export type CreateProductDTO = {
  sku: string;
  name: string;
  status: ProductStatus;
  ratings?: number | null;
  inventory: number;
  productBreakdown?: string | null;
  shippingReturnPolicy: string;
  description: string;
  price: number;
  profitMargin: number;
  displayPrice: number;
  category?: ProductCategory;
  subcategory?: string;
  tags: CreateTagDTO[];
  images: CreateImageDTO[];
  suppliers?: CreateSupplierDTO[] | Supplier[];
  amazonProductId?: string;
  aliExpressId?: string;
};

export type DisplayProductDTO = {
  id: string;
  sku: string;
  name: string;
  status: string;
  ratings: number | null;
  inventory: number;
  productBreakdown: string | null;
  shippingReturnPolicy: string;
  description: string;
  price: number;
  profitMargin: number;
  displayPrice: number;
  category?: ProductCategory;
  subcategory: string | null;
  amazonProductId?: string;
  cjDropShippingId?: string;
};

export type ProductCategory = {
  id: string;
  name: string;
  children?: ProductCategory[];
  parent? : ProductCategory | null;
  parentId?: string | null;

}



export type CreateGptPromptDTO = {
  id?: string;
  description: string;
  title: string;
  prompt: string | null;
  model: string | null;
  category?: GptCategory;
  temperature: number;
  max_tokens: number;
  top_p: number;
  best_of: number;
  frequency_penalty: number;
  presence_penalty: number;
  stop: string[]; // comma separaetd sequences
  timesUsed: number;
  timesIntegrated: number;
  costPerToken: number;
  profitMargin: number;
  tags: CreateTagDTO[];
  image: CreateImageDTO [];
  botUrl?: string;
  conversationStarters: GptConvoStarters[] | [],
  seed: number,
  startPhrase: string
  sysCommands: GptSysCommands | {}
  steps: GptSteps[] | [],
  stream: boolean
  toolChoice: string,
  tools: {}
  variables: {
    title: string,
    description: string
  }[]

};
export type GptCategory = {
  id?: string
  name: string;
  children?: GptCategory[],
  parent?: {
    id: string;
  } | null;
  parentId?: string
}
export type GptSteps = {
  index: number,
  command: string,
  callTo: "@LLM" | number
  priority: 'HIGH' | 'MEDIUM' | 'LOW',
  context: string
  goal: string,
}

export type CreateSupplierDTO = {
  baseShippingPrice: number;
  height: number;
  width: number;
  length: number;
  weight: number;
  supplierName: string;
  supplierStatus?: string;
  shippingWeight?: number;
  listPrice?: number;
  salePrice?: number;
  availability?: string;
  supplierWrittenComments?: string;
  supplierUrl: string;
  supplierEmail?: string;
  supplierWhatsApp?: string;
};

export type GptConvoStarters = {
  title: string;
  description: string
}

export type GptSysCommands = {
  [x: string]: {
    priority: 'HIGH' | 'MEDIUM' | 'LOW',
    context: string,
    example: string
  }
}
export type DisplayPrompt = GptPrompt & {
  stop: string[];
  reviews?: Review[];
  image?: Image;
  tags: Tag[];
  tools: {}
};
