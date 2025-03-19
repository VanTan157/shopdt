"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { AccountType } from "@/app/validate";
import https from "@/lib/http";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const BtnEditProfile = (user: { user: AccountType }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [currentP, setCurrentP] = useState("");
  const [newP, setNewP] = useState("");
  const router = useRouter();

  // Hàm xử lý khi đóng Dialog
  interface HandleDialogChangeProps {
    isOpen: boolean;
  }

  const handleDialogChange = (isOpen: HandleDialogChangeProps["isOpen"]) => {
    setOpen(isOpen);
    if (!isOpen) {
      // Reset các field khi đóng dialog
      setName("");
      setCurrentP("");
      setNewP("");
    }
  };

  // Hàm save cho Account tab
  const saveChange = async () => {
    try {
      const res = await https.put(
        `auth/update-profile`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
        { name }
      );
      console.log(res);
      router.refresh();
      setName("");
      setCurrentP("");
      setNewP("");
      setOpen(false);
      toast.success((res as { message: string }).message);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else toast.error("Lỗi không xác định");
    }
  };

  // Hàm save cho Password tab
  const savePassword = async () => {
    try {
      const res = await https.put(
        `auth/change-password`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
        {
          oldPassword: currentP,
          newPassword: newP,
        }
      );
      console.log(res);
      router.refresh();
      setName("");
      setCurrentP("");
      setNewP("");
      setOpen(false);
      toast.success((res as { message: string }).message);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else toast.error("Lỗi không xác định");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <Button className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[70%] min-w-[50%]">
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogDescription>Cập nhật hồ sơ của bạn</DialogDescription>
        <Tabs defaultValue="account" className="w-full h-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="account"
              className="data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 transition-all duration-200"
            >
              Account
            </TabsTrigger>
            <TabsTrigger
              value="password"
              className="data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 transition-all duration-200"
            >
              Password
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Change your name here</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue={user.user.email} readOnly />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={saveChange}
                  className="bg-green-500 hover:bg-green-600 w-full"
                >
                  Save changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Change your password here</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input
                    id="current"
                    type="password"
                    value={currentP}
                    onChange={(e) => setCurrentP(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input
                    id="new"
                    type="password"
                    value={newP}
                    onChange={(e) => setNewP(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={savePassword}
                  className="bg-green-500 hover:bg-green-600 w-full"
                >
                  Save password
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default BtnEditProfile;
