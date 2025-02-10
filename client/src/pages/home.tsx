import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { YoutubeIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { youtubeUrlSchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface SummaryResponse {
  videoId: string;
  videoUrl: string;
  title: string;
  thumbnail: string;
  duration: string;
  summary: string;
}

export default function Home() {
  const [summary, setSummary] = useState<SummaryResponse | null>(null);
  const { toast } = useToast();
  
  const form = useForm({
    resolver: zodResolver(youtubeUrlSchema),
    defaultValues: {
      url: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: { url: string }) => {
      const res = await apiRequest("POST", "/api/summarize", data);
      return res.json();
    },
    onSuccess: (data: SummaryResponse) => {
      setSummary(data);
      toast({
        title: "Summary Generated",
        description: "Your video summary is ready!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: { url: string }) {
    setSummary(null);
    mutate(data);
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            YouTube Video Summarizer
          </h1>
          <p className="text-muted-foreground">
            Get AI-powered summaries of any YouTube video
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Paste YouTube URL here..."
                            {...field}
                          />
                          <Button type="submit" disabled={isPending}>
                            {isPending ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              "Summarize"
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
        </Card>

        {isPending && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            </CardContent>
          </Card>
        )}

        {summary && (
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex gap-4 items-start">
                <img
                  src={summary.thumbnail}
                  alt={summary.title}
                  className="w-40 rounded-lg"
                />
                <div className="space-y-1">
                  <h2 className="font-semibold text-xl">{summary.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    Duration: {summary.duration}
                  </p>
                  <div className="flex items-center gap-1 text-sm">
                    <YoutubeIcon className="h-4 w-4 text-red-500" />
                    <a
                      href={summary.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Watch on YouTube
                    </a>
                  </div>
                </div>
              </div>

              <div className="prose prose-sm max-w-none">
                <h3 className="text-lg font-semibold mb-2">Summary</h3>
                <p className="whitespace-pre-wrap">{summary.summary}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
