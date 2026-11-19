"use client";

import { useEffect, useState } from "react";
import { demoRefundRepository } from "@/lib/data/repository";
import type { Refund } from "@/lib/data/types";

export function useRefunds() {
  const [refunds, setRefunds] = useState<Refund[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    demoRefundRepository.list().then((list) => {
      if (!active) return;
      setRefunds(list);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  return { refunds, loading };
}
