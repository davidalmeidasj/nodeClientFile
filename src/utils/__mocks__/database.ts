const mockQuery = jest.fn();

const db = {
    query: mockQuery,
};

export { db, mockQuery };
