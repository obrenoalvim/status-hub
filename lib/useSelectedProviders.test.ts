import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useSelectedProviders } from "./useSelectedProviders";

beforeEach(() => {
  localStorage.clear();
});

describe("useSelectedProviders", () => {
  it("starts empty when localStorage has nothing saved", () => {
    const { result } = renderHook(() => useSelectedProviders());
    expect(result.current.selected).toEqual([]);
  });

  it("loads a previously saved selection", () => {
    localStorage.setItem("statushub.selected", JSON.stringify(["github", "vercel"]));

    const { result } = renderHook(() => useSelectedProviders());

    expect(result.current.selected).toEqual(["github", "vercel"]);
  });

  it("persists a new selection and updates the hook in the same tab", async () => {
    const { result } = renderHook(() => useSelectedProviders());

    act(() => {
      result.current.save(["cloudflare"]);
    });

    await waitFor(() => expect(result.current.selected).toEqual(["cloudflare"]));
    expect(JSON.parse(localStorage.getItem("statushub.selected") ?? "[]")).toEqual(["cloudflare"]);
  });
});
