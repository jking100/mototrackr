
//export const HTTP_API_BASE_URL = "https://localhost:5000/api";
export const HTTPS_API_BASE_URL = "https://localhost:7011/api";

/**
 * @typedef {Object} userSubmissionItem
 * @property {number} id
 * @property {string} personName
 * @property {string} vehicleName
 * @property {number} zeroToSixtyTime
 */

/**
 * Handles all userSubmissionItem api calls
 */
const userSubmissionItemService = {
  /**
   * get all records from db
   * @returns {Promise<userSubmissionItem[]>}
   */
  getAll: async () => {
    const response = await fetch(`${HTTPS_API_BASE_URL}/UserSubmissionItems`);
    if (!response.ok) throw new Error("Failed to fetch all items");
    return response.json();
  },

  /**
   * insert new item into db
   * @param {Omit<userSubmissionItem, 'id'>} Item - data (without ID)
   * @returns {Promise<userSubmissionItem>}
   */
  create: async (userSubmissionItem) => {
    const response = await fetch(`${HTTPS_API_BASE_URL}/UserSubmissionItems`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userSubmissionItem),
    });
    if (!response.ok)
      throw new Error("Failed to post: " + JSON.stringify(userSubmissionItem));
    return response.json();
  },

  /**
   * Get specific item by id
   * @param {number} id
   * @returns {Promise<userSubmissionItem>}
   */
  read: async (id) => {
    const response = await fetch(
      `${HTTPS_API_BASE_URL}/UserSubmissionItems/${id}`,
    );
    if (!response.ok)
      throw new Error("Failed to get item by id: " + id.toString());
    return response.json();
  },

  /**
   * Update specific item by id
   * @param {number} id
   * @param {Partial<Item>} updates - Fields to update
   * @returns {Promise<userSubmissionItem>}
   */
  update: async (id, updates) => {
    const response = await fetch(
      `${HTTPS_API_BASE_URL}/UserSubmissionItems/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      },
    );
    if (!response.ok)
      throw new Error(`Failed to update item ${id} with data: ${updates}`);
    return response.json();
  },

  /**
   * Delete specific item by id
   * @param {number} id
   * @returns {Promise<void>}
   */
  delete: async (id) => {
    const response = await fetch(
      `${HTTPS_API_BASE_URL}/UserSubmissionItems/${id}`,
    );
    if (!response.ok) throw new Error(`Failed to delete item ${id}`);
    return response.json();
  },
};

export default userSubmissionItemService;
