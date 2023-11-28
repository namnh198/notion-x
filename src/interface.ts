import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'
import { StaticImageData } from 'next/image'
import { Block } from 'notion-types'

export type OptionalCatchAllProps = { params: OptionalCatchAllParams }
export type OptionalCatchAllParams = { slug: string[] }
export type DynamicSegmentParamsProps = { params: DynamicSegmentParams }
export type DynamicSegmentParams = { slug: string }

export type ImageType = {
  sourceUrl?: string | null
  sizes?: string
  altText?: string
  blurDataURL?: string
  width?: number
  height?: number
  staticImageData?: StaticImageData // for default featured images
  imgur?: string // image uploaded to imgur
} | null

export type PostHeaderType = {
  id: string
  title: string
  drawTitle?: any
  featuredImage?: ImageType
  updatedDate?: string // the same as last modified date (or finalModified)
  createdDate?: string // used to display "updated" badge
  tags?: Tag[]
  categories?: Category[]
  authors?: Author[]
  published?: boolean
  draft?: boolean // is this post a draft?
  page?: boolean // is this post a page?
  icon?: {
    emoji?: string
    img?: ImageType
  }
  cover?: string
  verified?: boolean
  pinned?: boolean
}

export interface Post extends PostHeaderType {
  slug?: string
  permalink: string
  excerpt?: RichTextItemResponse[]
  block?: Block
}

export type Page = {
  id?: string
  title: string
  uri: string
  slug?: string
}

export type Category = {
  name: string
  uri: string
  // "slug" is obligatory but we set it "optional" here because the categories taken
  // from Notion don't have slug
  slug?: string | null
  id?: string
  description?: string
  style?: {
    bgColor: string
    textColor: string
    bdColor?: string
    titleColor?: string // Used in header of category page
  }
  featuredImage?: ImageType
  fontello?: string
  backgroundClassName?: string // used for index page
}

export type Tag = {
  name: string
  id?: string
  slug?: string
  permalink: string
  icon?: string
  className?: string
  description?: string
  pinned?: boolean
  color?: string
  customClass?: string
}

export type Author = {
  slug?: string | null
  id: string
  name?: string | null
  uri: string
  description?: string | null
  avatarUrl?: string | null
  icon?: string | null
  role?: string | null
  email?: string | null
  website?: string | null
  posts?: Post[] | null
}

export type NotionPostData = {
  id: string
  created_time: string
  last_edited_time?: string
  cover?: {
    external?: { url: string }
    file?: { url: string }
  }
  icon?: {
    emoji?: string
    external?: { url: string }
    file?: { url: string }
  }
  properties: {
    Name: {
      title: { plain_text: string }[]
    }
    url: string
    tags?: {
      multi_select: NotionTagData[]
    }
    excerpt?: {
      rich_text: { plain_text: string }[]
    }
  }
}

export type NotionTagData = {
  id: string
  name: string
  color: string
}

export type NotionSorts = {
  property: string
  direction: 'ascending' | 'descending'
}

export type AnnotationIgnoreField =
  | 'bold'
  | 'italic'
  | 'strikethrough'
  | 'underline'
  | 'code'
  | 'color'

export type TextIgnoreField = 'hyperlink' | AnnotationIgnoreField

export type SearchResult = {
  id: string
  title: string
  slug: string
  titleHighlighted: string
  textHighlighted: string
  isPublished: boolean
  isBookPost?: boolean
  isFake?: boolean // used to not perform the request
}

export type BookmarkPreview = {
  url: string
  title?: string
  description: string | null
  favicon?: string
  imageSrc: string | null
}

export type SearchParams = {
  query: string
  limit?: number
  filters?: any
}
