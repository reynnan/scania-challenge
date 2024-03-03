import PreviousResults from "@/components/PreviousResults";
import PromptForm from "@/components/PromptForm";
import Head from "next/head";

export default function Index() {
  return (
    <>
      <Head>
        <title>Ratatouille AI</title>
      </Head>
      <section
        className={`container mx-auto flex flex-col max-w-5xl items-center py-[10vh] px-6 md:px-0`}
      >
        <div className="flex flex-col items-center prose">
          <h1 className="mb-1 flex flex-nowrap">
            Ratatouille AI <span>🐭</span>
          </h1>
          <p className="mt-0 mb-5 md:mb-10 text-gray-500">
            Ratatouille can help you suggesting recipes ideas and instructions!
          </p>
          <PromptForm />
        </div>
      </section>
      <PreviousResults />
    </>
  );
}
