import { gql } from "@apollo/client";

const GET_COUPON = gql`
  query GET_COUPON($title: String) {
    coupons(where: { title: $title }) {
      nodes {
        title
        customfields {
          discount
        }
      }
    }
  }
`;

const GET_ALL_COUPONS = gql`
  query GET_ALL_COUPONS {
    coupons {
      nodes {
        title
        customfields {
          discount
        }
      }
    }
  }
`;

const GET_ITEMS = gql`
  query GET_ITEMS(
    $tags: [String]
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    clothes(
      first: $first
      last: $last
      after: $after
      before: $before
      where: { tagSlugAnd: $tags }
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        id
        title
        content
        featuredImage {
          node {
            sourceUrl
            title
          }
        }
        customFields {
          price
          saleprice
        }
        tags {
          nodes {
            name
          }
        }
      }
    }
  }
`;

const GET_ONE_ITEM = gql`
  query GET_ONE_ITEM($id: [ID]) {
    clothes(where: { in: $id }) {
      nodes {
        id
        title
        content
        featuredImage {
          node {
            sourceUrl
            title
          }
        }
        customFields {
          price
          saleprice
        }
        tags {
          nodes {
            name
          }
        }
      }
    }
  }
`;

const GET_THREE_MORE_ITEMS = gql`
  query GET_THREE_MORE_ITEMS($tags: [String]) {
    clothes(
      first: 3
      where: {
        tagSlugIn: $tags
        orderby: { field: META_KEY, metaKeyField: "price", order: ASC }
      }
    ) {
      nodes {
        id
        title
        content
        featuredImage {
          node {
            sourceUrl
            title
          }
        }
        customFields {
          price
          saleprice
        }
        tags {
          nodes {
            name
          }
        }
      }
    }
  }
`;

const GET_ITEMS_PRICE_ASC = gql`
  query GET_ITEMS_PRICE_ASC(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $tags: [String]
  ) {
    clothes(
      first: $first
      last: $last
      after: $after
      before: $before
      where: {
        tagSlugIn: $tags
        orderby: { field: META_KEY, metaKeyField: "price", order: ASC }
      }
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        id
        title
        content
        featuredImage {
          node {
            sourceUrl
            title
          }
        }
        customFields {
          price
          saleprice
        }
        tags {
          nodes {
            name
          }
        }
      }
    }
  }
`;

const GET_ITEMS_PRICE_DESC = gql`
  query GET_ITEMS_PRICE_DESC(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $tags: [String]
  ) {
    clothes(
      first: $first
      last: $last
      after: $after
      before: $before
      where: {
        tagSlugIn: $tags
        orderby: { field: META_KEY, metaKeyField: "price", order: DESC }
      }
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        id
        title
        content
        featuredImage {
          node {
            sourceUrl
            title
          }
        }
        customFields {
          price
          saleprice
        }
        tags {
          nodes {
            name
          }
        }
      }
    }
  }
`;

const GET_ITEMS_TITLE_ASC = gql`
  query GET_ITEMS_TITLE_ASC(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $tags: [String]
  ) {
    clothes(
      first: $first
      last: $last
      after: $after
      before: $before
      where: { tagSlugIn: $tags, orderby: { field: TITLE, order: ASC } }
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        id
        title
        content
        featuredImage {
          node {
            sourceUrl
            title
          }
        }
        customFields {
          price
          saleprice
        }
        tags {
          nodes {
            name
          }
        }
      }
    }
  }
`;

const GET_ITEMS_TITLE_DESC = gql`
  query GET_ITEMS_TITLE_DESC(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $tags: [String]
  ) {
    clothes(
      first: $first
      last: $last
      after: $after
      before: $before
      where: { tagSlugIn: $tags, orderby: { field: TITLE, order: DESC } }
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        id
        title
        content
        featuredImage {
          node {
            sourceUrl
            title
          }
        }
        customFields {
          price
          saleprice
        }
        tags {
          nodes {
            name
          }
        }
      }
    }
  }
`;

const SEARCH_ITEMS = gql`
  query SEARCH_ITEMS($search: String) {
    clothes(where: { search: $search }) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        id
        title
        content
        featuredImage {
          node {
            sourceUrl
            title
          }
        }
        customFields {
          price
          saleprice
        }
        tags {
          nodes {
            name
          }
        }
      }
    }
  }
`;

const GET_CART_ITEMS = gql`
  query GET_CART_ITEMS($array: [ID]) {
    clothes(where: { in: $array }) {
      nodes {
        id
        title
        content
        featuredImage {
          node {
            sourceUrl
            title
          }
        }
        customFields {
          price
          saleprice
        }
        tags {
          nodes {
            name
          }
        }
      }
    }
  }
`;

export {
  SEARCH_ITEMS,
  GET_ITEMS,
  GET_CART_ITEMS,
  GET_ITEMS_PRICE_ASC,
  GET_ITEMS_PRICE_DESC,
  GET_ITEMS_TITLE_ASC,
  GET_ITEMS_TITLE_DESC,
  GET_ONE_ITEM,
  GET_THREE_MORE_ITEMS,
  GET_COUPON,
  GET_ALL_COUPONS,
};
