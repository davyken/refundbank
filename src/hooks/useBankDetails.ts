"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createLocalBankRepository } from "@/lib/data/repository";
import type { BankDetails } from "@/lib/validation/bank";

export function useBankDetails() {
  const repository = useMemo(
    () => createLocalBankRepository(typeof window === "undefined" ? undefined : window.localStorage),
    [],
  );
  const [details, setDetails] = useState<BankDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    repository.get().then((saved) => {
      if (!active) return;
      setDetails(saved);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [repository]);

  const save = useCallback(
    async (next: BankDetails) => {
      await repository.save(next);
      setDetails(next);
    },
    [repository],
  );

  const remove = useCallback(async () => {
    await repository.remove();
    setDetails(null);
  }, [repository]);

  return { details, loading, save, remove };
}
