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

const BtnEditProfile = () => {
  const [open, setOpen] = useState(false); // Quản lý trạng thái dialog

  const handleSave = () => {
    // Xử lý logic lưu dữ liệu (nếu có)
    console.log("Saved!");
    setOpen(false); // Đóng dialog
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
                <CardDescription>Chang your name here</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Pedro Duarte" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="@peduarte" />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleSave}
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
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleSave}
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
