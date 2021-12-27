/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRecord = /* GraphQL */ `
  mutation CreateRecord(
    $input: CreateRecordInput!
    $condition: ModelRecordConditionInput
  ) {
    createRecord(input: $input, condition: $condition) {
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
export const updateRecord = /* GraphQL */ `
  mutation UpdateRecord(
    $input: UpdateRecordInput!
    $condition: ModelRecordConditionInput
  ) {
    updateRecord(input: $input, condition: $condition) {
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
export const deleteRecord = /* GraphQL */ `
  mutation DeleteRecord(
    $input: DeleteRecordInput!
    $condition: ModelRecordConditionInput
  ) {
    deleteRecord(input: $input, condition: $condition) {
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
export const createTrash = /* GraphQL */ `
  mutation CreateTrash(
    $input: CreateTrashInput!
    $condition: ModelTrashConditionInput
  ) {
    createTrash(input: $input, condition: $condition) {
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
export const updateTrash = /* GraphQL */ `
  mutation UpdateTrash(
    $input: UpdateTrashInput!
    $condition: ModelTrashConditionInput
  ) {
    updateTrash(input: $input, condition: $condition) {
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
export const deleteTrash = /* GraphQL */ `
  mutation DeleteTrash(
    $input: DeleteTrashInput!
    $condition: ModelTrashConditionInput
  ) {
    deleteTrash(input: $input, condition: $condition) {
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
