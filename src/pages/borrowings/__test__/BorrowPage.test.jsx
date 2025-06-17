import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import BorrowPage from "../BorrowPage";

// Mocks
vi.mock(
  "../../../modules/borrowings/controller/GetBorrowBooksController",
  () => ({
    GetBorrowBooksController: vi.fn(),
  })
);

vi.mock(
  "../../../modules/borrowings/components/borrow/BookCardSkeleton",
  () => ({
    default: () => <div data-testid="skeleton">Skeleton</div>,
  })
);

vi.mock("../../../modules/borrowings/components/borrow/BookCard", () => ({
  default: ({ book, isAvailable, onBorrow, onReturn }) => (
    <div data-testid={`book-card-${isAvailable ? "available" : "to-return"}`}>
      <button onClick={() => (isAvailable ? onBorrow(book) : onReturn(book))}>
        {book.title}
      </button>
    </div>
  ),
}));

vi.mock("../../../modules/borrowings/components/borrow/SearchBar", () => ({
  default: ({ onSearch }) => (
    <input
      type="text"
      placeholder="Search by title, author or ISBN"
      onChange={(e) => onSearch(e.target.value)}
    />
  ),
}));

vi.mock("../../../modules/borrowings/components/borrow/BorrowModal", () => ({
  default: ({ show, borrowBookSubmit }) =>
    show ? (
      <div data-testid="borrow-modal">
        BorrowModal
        <button
          onClick={() =>
            borrowBookSubmit({
              title: "Success",
              message: "The book was borrowed successfully.",
              success: true,
            })
          }
        >
          Confirm Borrow
        </button>
      </div>
    ) : null,
}));

vi.mock("../../../modules/borrowings/components/return/ReturnModal", () => ({
  default: ({ show, returnBookSubmit }) =>
    show ? (
      <div data-testid="return-modal">
        ReturnModal
        <button
          onClick={() =>
            returnBookSubmit({
              title: "Returned",
              message: "The book was returned successfully.",
              success: true,
            })
          }
        >
          Confirm Return
        </button>
      </div>
    ) : null,
}));

vi.mock("../../../components/alerts/AlertClose", () => ({
  default: ({ title, content }) => (
    <div data-testid="alert">
      <strong>{title}</strong>
      <p>{content}</p>
    </div>
  ),
}));

const { GetBorrowBooksController } = await import(
  "../../../modules/borrowings/controller/GetBorrowBooksController"
);

describe("BorrowPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render initial text and show skeletons while loading", async () => {
    GetBorrowBooksController.mockResolvedValue({
      available: [],
      to_return: [],
    });
    render(<BorrowPage />);
    expect(screen.getByText("Search books")).toBeInTheDocument();
    await waitFor(() =>
      expect(GetBorrowBooksController).toHaveBeenCalledTimes(1)
    );
    expect(screen.getAllByTestId("skeleton").length).toBeGreaterThanOrEqual(1);
  });

  it("should display available and to-return books when loaded", async () => {
    const mockBooks = {
      available: [
        { id: 1, title: "Available Book 1" },
        { id: 2, title: "Available Book 2" },
      ],
      to_return: [{ id: 3, title: "Return Book 1" }],
    };
    GetBorrowBooksController.mockResolvedValue(mockBooks);
    render(<BorrowPage />);
    await waitFor(() =>
      expect(screen.queryByText("Available Book 1")).toBeInTheDocument()
    );

    // This is more reliable than getByText(fn)
    expect(screen.queryByText("Books to Return")).toBeTruthy();
    expect(screen.getAllByTestId("book-card-to-return")).toHaveLength(1);
    expect(screen.getAllByTestId("book-card-available")).toHaveLength(2);
  });

  it("should trigger search when typing in the input", async () => {
    GetBorrowBooksController.mockResolvedValueOnce({
      available: [],
      to_return: [],
    });
    render(<BorrowPage />);
    await waitFor(() =>
      expect(GetBorrowBooksController).toHaveBeenCalledTimes(1)
    );

    const input = screen.getByPlaceholderText(/Search by title/i);
    fireEvent.change(input, { target: { value: "React" } });

    await waitFor(() =>
      expect(GetBorrowBooksController).toHaveBeenCalledWith("React")
    );
  });

  it("should change page when pagination button is clicked", async () => {
    const books = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      title: `Book ${i + 1}`,
    }));

    GetBorrowBooksController.mockResolvedValue({
      available: books,
      to_return: [],
    });

    render(<BorrowPage />);

    await waitFor(() =>
      expect(screen.getAllByTestId("book-card-available")).toHaveLength(6)
    );

    const page2Btn = screen.getByText("2");
    fireEvent.click(page2Btn);

    await waitFor(() => {
      expect(screen.getAllByTestId("book-card-available")).toHaveLength(4);
    });
  });

  it("should open the borrow modal when a book is selected", async () => {
    GetBorrowBooksController.mockResolvedValue({
      available: [{ id: 1, title: "Book A" }],
      to_return: [],
    });

    render(<BorrowPage />);
    await waitFor(() => expect(screen.getByText("Book A")).toBeInTheDocument());

    const bookBtn = screen.getByText("Book A");
    fireEvent.click(bookBtn);

    await waitFor(() => {
      expect(screen.getByTestId("borrow-modal")).toBeInTheDocument();
    });
  });

  it("should show alert after borrowing a book", async () => {
    GetBorrowBooksController.mockResolvedValue({
      available: [{ id: 1, title: "Book A" }],
      to_return: [],
    });

    render(<BorrowPage />);
    await waitFor(() => expect(screen.getByText("Book A")).toBeInTheDocument());

    fireEvent.click(screen.getByText("Book A"));

    fireEvent.click(await screen.findByText("Confirm Borrow"));

    // Espera a que la alerta se muestre
    expect(await screen.findByTestId("alert")).toBeInTheDocument();
    expect(screen.getByText("Success")).toBeInTheDocument();
    expect(
      screen.getByText("The book was borrowed successfully.")
    ).toBeInTheDocument();
  });

  it("should open the return modal and show alert after returning a book", async () => {
    GetBorrowBooksController.mockResolvedValue({
      available: [],
      to_return: [{ id: 1, title: "Return Book A" }],
    });

    render(<BorrowPage />);
    await waitFor(() =>
      expect(screen.getByText("Return Book A")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText("Return Book A")); 

    fireEvent.click(await screen.findByText("Confirm Return")); 

    expect(await screen.findByTestId("alert")).toBeInTheDocument();
    expect(screen.getByText("Returned")).toBeInTheDocument();
    expect(
      screen.getByText("The book was returned successfully.")
    ).toBeInTheDocument();
  });

  it("should not show 'Books to Return' section if no returnable books exist", async () => {
    GetBorrowBooksController.mockResolvedValue({
      available: [{ id: 1, title: "Available Book" }],
      to_return: [],
    });

    render(<BorrowPage />);
    await waitFor(() => {
      expect(screen.queryByText("Books to Return")).not.toBeInTheDocument();
      expect(screen.getByText("Available Book")).toBeInTheDocument();
    });
  });

  it("should handle errors when fetching books", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    GetBorrowBooksController.mockRejectedValue(new Error("Server error"));

    render(<BorrowPage />);
    await waitFor(() => expect(GetBorrowBooksController).toHaveBeenCalled());

    expect(consoleSpy).toHaveBeenCalledWith(
      "Error fetching books:",
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });

  it("should reset current page when searching", async () => {
    const books = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      title: `Book ${i + 1}`,
    }));

    GetBorrowBooksController.mockResolvedValue({
      available: books,
      to_return: [],
    });

    render(<BorrowPage />);

    await waitFor(() => expect(screen.getByText("2")).toBeInTheDocument());
    fireEvent.click(screen.getByText("2"));

    const input = screen.getByPlaceholderText(/Search by title/i);
    fireEvent.change(input, { target: { value: "New search" } });

    await waitFor(() =>
      expect(
        screen.getAllByTestId("book-card-available").length
      ).toBeLessThanOrEqual(6)
    );
  });
});
