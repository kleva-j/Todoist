import { AnimatedShinyText } from "@/components/animated-shiny-text";
import { NeonGradientCard } from "@/components/neon-gradient";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { SparklesText } from "@/components/sparkle-text";
import { ArrowRight, ChevronRight } from "lucide-react";
import { VideoDialog } from "@/components/video-dialog";
import { Header } from "@/components/layout/header";
import { Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import NextLink from "next/link";

const signInLink = siteConfig.navigations.links["sign-in"];

export default function Home() {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 blur-xl h-[36.25rem] -z-[1px]"
        style={{
          background:
            "linear-gradient(143.6deg, rgba(192, 132, 252, 0) 20.79%, rgba(232, 121, 249, 0.26) 40.92%, rgba(204, 171, 238, 0) 70.35%)",
        }}
      ></div>
      <div className="relative">
        <Header />
        <div className="grid grid-rows-[20px_1fr_20px] max-w-5xl mx-auto items-center justify-items-center h-full p-8 pb-20 gap-14 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start max-w-2xl">
            <div
              className={cn(
                "group rounded-full border border-black/5 bg-neutral-50 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-100 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800 mx-auto"
              )}
            >
              <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                <span>✨ Introducing Todoist</span>
                <ArrowRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </AnimatedShinyText>
            </div>

            <div className="flex gap-2 max-w-md md:max-w-3xl text-left mr-auto items-center">
              <Text
                as="h1"
                variant="h3"
                className="flex-1 text-nowrap text-3xl md:text-4xl tracking-tighter lg:text-5xl font-geist font-normal text-transparent bg-clip-text bg-[linear-gradient(180deg,_#000_0%,_rgba(255,_255,_255,_0.00)_202.08%)] dark:bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)] leading-0"
              >
                Todos + AI =
              </Text>
              <SparklesText className="relative -top-1">
                <Text
                  as="span"
                  variant="h1"
                  className="text-3xl md:text-4xl lg:text-5xl font-geist font-medium tracking-tight text-orange-500"
                >
                  Superpowers 🦸
                </Text>
              </SparklesText>
            </div>
            <div className="text-base text-center sm:text-left">
              <Text className="text-justify">
                Scale up your productivity with the power of AI. Our{" "}
                <span className="font-semibold">AI-powered</span> all-in-one
                Todo app. Create, organize, and manage your tasks with ease.
                Whether you&apos;re a busy professional or a student, our app
                has got you covered.
              </Text>
            </div>

            <div className="flex justify-center w-full">
              <Button
                size="lg"
                variant="outline"
                className="group inline-flex h-10 animate-shimmer items-center justify-center rounded-full border border-black/20 dark:border-slate-800 bg-[linear-gradient(110deg,#f5f5f5,45%,#e5e5e5,55%,#f5f5f5)] bg-[length:200%_100%] dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] px-6 font-medium text-gray-700 dark:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                <NextLink href={signInLink.href}>Get Started</NextLink>
                <ChevronRight className="ml-2 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </Button>
            </div>
          </main>

          <section className="row-start-4 w-full mt-16">
            <NeonGradientCard
              borderSize={1}
              borderRadius={15}
              className="flex items-center justify-center text-center"
            >
              <AspectRatio
                ratio={16 / 9}
                className="dark:animate-pulse bg-gradient-to-r from-slate-900 via-black to-slate-900 rounded-2xl overflow-hidden"
              >
                <VideoDialog
                  thumbnailSrc="https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=600"
                  thumbnailAlt="Stock photo"
                  videoSrc="https://videos.pexels.com/video-files/3129576/3129576-uhd_2560_1440_30fps.mp4"
                />
              </AspectRatio>
            </NeonGradientCard>
          </section>
          <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
        </div>
      </div>
    </div>
  );
}
