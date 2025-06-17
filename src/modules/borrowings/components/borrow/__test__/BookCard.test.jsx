import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import BookCard from "../BookCard";
import lendifyLogo from "../../../../../assets/images/lendify.png";

describe("BookCard", () => {
  const mockBook = {
    id: 1,
    title: "Clean Code",
    author: { name: "Robert C. Martin" },
    isbn: "978-0132350884",
    image: null,
  };

  it("should render title, author, and ISBN", () => {
    render(<BookCard book={mockBook} isAvailable={true} />);
    expect(screen.getByText("Clean Code")).toBeInTheDocument();
    expect(screen.getByText("Robert C. Martin")).toBeInTheDocument();
    expect(screen.getByText(/ISBN: 978-0132350884/)).toBeInTheDocument();
  });

  it("should use default image if no book image is provided", () => {
    render(<BookCard book={mockBook} isAvailable={true} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", lendifyLogo);
    expect(img).toHaveAttribute("alt", "Clean Code");
  });

  it("should render custom image if book has image", () => {
    const bookWithImage = {
      ...mockBook,
      image: "clean-code.jpg",
    };

    render(<BookCard book={bookWithImage} isAvailable={true} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute(
      "src",
      `${import.meta.env.VITE_PUBLIC_BASE_URL}storage/books/clean-code.jpg`
    );
  });

  it("should show 'Borrow' button when isAvailable is true", () => {
    render(<BookCard book={mockBook} isAvailable={true} />);
    expect(screen.getByRole("button", { name: /borrow/i })).toBeInTheDocument();
  });

  it("should show 'Return' button when isAvailable is false", () => {
    render(<BookCard book={mockBook} isAvailable={false} />);
    expect(screen.getByRole("button", { name: /return/i })).toBeInTheDocument();
  });

  it("should call onBorrow when clicking the Borrow button", () => {
    const onBorrowMock = vi.fn();
    render(
      <BookCard book={mockBook} isAvailable={true} onBorrow={onBorrowMock} />
    );

    fireEvent.click(screen.getByRole("button", { name: /borrow/i }));
    expect(onBorrowMock).toHaveBeenCalledWith(mockBook);
  });

  it("should call onReturn when clicking the Return button", () => {
    const onReturnMock = vi.fn();
    render(
      <BookCard book={mockBook} isAvailable={false} onReturn={onReturnMock} />
    );

    fireEvent.click(screen.getByRole("button", { name: /return/i }));
    expect(onReturnMock).toHaveBeenCalledWith(mockBook);
  });
});
