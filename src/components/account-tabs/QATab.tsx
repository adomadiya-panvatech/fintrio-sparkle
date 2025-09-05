import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Plus } from "lucide-react";

const mockQAs = [
  {
    id: "QA-001",
    question: "What is the minimum investment amount?",
    answer: "The minimum investment amount is $25,000 for accredited investors.",
    status: "Answered",
    date: "2024-01-15"
  },
  {
    id: "QA-002",
    question: "How often are distributions made?",
    answer: "Distributions are made quarterly, typically in March, June, September, and December.",
    status: "Answered", 
    date: "2024-01-10"
  },
  {
    id: "QA-003",
    question: "Can I increase my investment later?",
    answer: "Yes, additional investments can be made during open subscription periods.",
    status: "Answered",
    date: "2024-01-08"
  },
  {
    id: "QA-004",
    question: "What are the redemption terms?",
    answer: "",
    status: "Pending",
    date: "2024-01-20"
  }
];

export default function QATab() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Questions & Answers</h3>
          <p className="text-sm text-muted-foreground">
            Account holder questions and responses
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Q&A
        </Button>
      </div>

      <div className="space-y-4">
        {mockQAs.map((qa) => (
          <Card key={qa.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  {qa.question}
                </CardTitle>
                <Badge variant={qa.status === "Answered" ? "default" : "secondary"}>
                  {qa.status}
                </Badge>
              </div>
            </CardHeader>
            {qa.answer && (
              <CardContent className="pt-0">
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm">{qa.answer}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Answered on {new Date(qa.date).toLocaleDateString()}
                </p>
              </CardContent>
            )}
            {!qa.answer && (
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">
                  Question submitted on {new Date(qa.date).toLocaleDateString()}
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Answer Question
                </Button>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}