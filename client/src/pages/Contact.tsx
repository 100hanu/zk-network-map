import React from "react";
import { apiRequest } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertContactSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Link } from "wouter";

const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "이름은 최소 2자 이상이어야 합니다.",
  }),
  email: z.string().email({
    message: "유효한 이메일 주소를 입력하세요.",
  }),
  projectName: z.string().min(2, {
    message: "프로젝트 또는 회사명은 최소 2자 이상이어야 합니다.",
  }),
  interestArea: z.string({
    required_error: "관심 분야를 선택해주세요.",
  }),
  message: z.string().min(10, {
    message: "메시지는 최소 10자 이상이어야 합니다.",
  }).max(500, {
    message: "메시지는 최대 500자까지 입력할 수 있습니다.",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact: React.FC = () => {
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      projectName: "",
      interestArea: "",
      message: "",
    },
  });
  
  const mutation = useMutation({
    mutationFn: async (formData: ContactFormValues) => {
      const response = await apiRequest("POST", "/api/contacts", formData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "문의가 성공적으로 제출되었습니다",
        description: "빠른 시일 내에 연락드리겠습니다.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "문의 제출 중 오류가 발생했습니다",
        description: error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: ContactFormValues) {
    mutation.mutate(data);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-16 bg-background flex-grow">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold mb-4">
                <span className="text-white">문의</span>{" "}
                <span className="text-primary neon-glow">하기</span>
              </h1>
              <p className="text-gray-300">
                Succinct ZK 네트워크에 대해 더 알아보거나 파트너십에 관심이 있으시다면 문의해주세요
              </p>
            </div>

            <div className="bg-background rounded-xl p-8 border border-gray-800">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>이름</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="이름을 입력하세요" 
                              className="bg-muted border-gray-700 focus:border-primary" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>이메일</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="이메일 주소를 입력하세요" 
                              className="bg-muted border-gray-700 focus:border-primary" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="projectName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>프로젝트 또는 회사명</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="프로젝트 또는 회사명을 입력하세요" 
                            className="bg-muted border-gray-700 focus:border-primary" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="interestArea"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>관심 분야</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-muted border-gray-700 focus:border-primary">
                              <SelectValue placeholder="관심 분야를 선택하세요" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="partnership">파트너십</SelectItem>
                            <SelectItem value="technical">기술 통합</SelectItem>
                            <SelectItem value="investment">투자</SelectItem>
                            <SelectItem value="research">연구 협력</SelectItem>
                            <SelectItem value="other">기타</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>메시지</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="메시지를 입력하세요" 
                            className="bg-muted border-gray-700 focus:border-primary min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="text-center">
                    <Button 
                      type="submit" 
                      variant="neon" 
                      size="pillLg" 
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? (
                        <>
                          <span className="animate-spin mr-2">⟳</span>
                          제출 중...
                        </>
                      ) : "문의하기"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-gray-300 mb-6">
                다른 정보가 필요하신가요?
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outlineNeon" size="pill" asChild>
                  <Link href="/">
                    에코시스템 맵 보기
                  </Link>
                </Button>
                <Button variant="outlineNeon" size="pill" asChild>
                  <Link href="/tech-stack">
                    기술 스택 살펴보기
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
