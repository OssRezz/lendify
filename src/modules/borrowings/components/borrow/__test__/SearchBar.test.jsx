import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../../../../../modules/borrowings/components/borrow/SearchBar";

describe("SearchBar", () => {
  it("should render the input and trigger onSearch on typing", () => {
    const onSearchMock = vi.fn();
    render(<SearchBar onSearch={onSearchMock} />);

    const input = screen.getByPlaceholderText(
      /Search by title, author or ISBN/i
    );

    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "React" } });

    expect(onSearchMock).toHaveBeenCalledWith("React");
  });

  it("should update the input value when typing", () => {
    const onSearchMock = vi.fn();
    render(<SearchBar onSearch={onSearchMock} />);

    const input = screen.getByPlaceholderText(
      /Search by title, author or ISBN/i
    );

    fireEvent.change(input, { target: { value: "NestJS" } });
    expect(input.value).toBe("NestJS");
  });
});
