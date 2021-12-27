/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRecord = /* GraphQL */ `
  query GetRecord($id: ID!) {
    getRecord(id: $id) {
      id
      userId
      title
      description
      html
      css
      js
      createdAt
      lastUpdated
      updatedAt
    }
  }
`;
export const listRecords = /* GraphQL */ `
  query ListRecords(
    $filter: ModelRecordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecords(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        title
        description
        html
        css
        js
        createdAt
        lastUpdated
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTrash = /* GraphQL */ `
  query GetTrash($id: ID!) {
    getTrash(id: $id) {
      id
      userId
      title
      description
      html
      css
      js
      createdAt
      lastUpdated
      updatedAt
    }
  }
`;
export const listTrashes = /* GraphQL */ `
  query ListTrashes(
    $filter: ModelTrashFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrashes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        title
        description
        html
        css
        js
        createdAt
        lastUpdated
        updatedAt
      }
      nextToken
    }
  }
`;
