"use client";
import React, { useEffect, useState } from "react";
import TitleTags from "../components/Title";
import { useSearchParams } from "next/navigation";
import { getTranslations } from "@/utils/getTranslation";
import Link from "next/link";

function Mac() {
  const [translationList, setTranslationList] = useState(null);
  const searchParams = useSearchParams();
  const UDID = searchParams.get("UDID");
  const chip = searchParams.get("Chip")?.toLowerCase();

  useEffect(() => {
    // Get Translations
    getTranslationList();
  }, []);

  // Get Translations
  const getTranslationList = async () => {
    try {
      const translations = await getTranslations();
      setTranslationList(translations);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <head>
        <TitleTags title="Mac Signing" />
      </head>
      <div className="mx-5 md:mx-10 mt-5">
        <div class="px-4 py-4 mx-auto sm:px-6 md:px-12 lg:px-24 lg:py-8 flex flex-col w-full mb-12 text-center">
          <h1 class="text-4xl font-bold leading-none tracking-tighter text-neutral-600 dark:text-gray-200">
            <span>{translationList?.mac_udid_grabber}</span>
          </h1>
        </div>
        <div class="block rounded-xl p-8 shadow-xl bg-bright dark:text-black lg:mx-96 mb-12 dark:text-gray-900">
          {!UDID ? (
            <div>
              <h3 class="text-xl font-semibold">
                <span>{translationList?.get_udid}</span>
              </h3>
              <p>{translationList?.mac_terminal_script}</p>
              <div class="mockup-code mt-4 text-left">
                <pre class="flex" data-prefix="$">
                  <code>eval `curl https://signtunes.com/get_udid`</code>
                </pre>
              </div>
            </div>
          ) : (
            <>
              {chip?.includes("intel") || !chip?.includes("apple") ? (
                <div>
                  <h3 class="text-xl font-semibold">Device Incompatible</h3>
                  <p>Your Mac doesn't seem to use Apple Silicon.</p>
                </div>
              ) : (
                <div>
                  <h3 class="text-xl font-semibold">Continue</h3>
                  <p>Please ensure your Mac is using an Apple Silicon chip.</p>
                  <p>
                    Finally,{" "}
                    <Link href="/purchase" class="text-blue-400 font-bold">
                      Purchase Signtunes
                    </Link>
                    . Your Mac's UDID is {UDID}.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Mac;