import PageHeader from "../components/PageHeader";
import {Button} from "@/components/ui/Button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
export default function FiturXYZ() {
    return (
        <div id="dashboard-container">
            <PageHeader title="Fitur XYZ" />
            <p>Ini adalah halaman untuk fitur XYZ yang sedang dalam pengembangan. Nantikan update selanjutnya!</p>

            <Button variant="outline">Simpan</Button>
            <Button variant="default">Simpan</Button>
            <Button variant="secondary">Simpan</Button>
            <Button variant="destructive">Simpan</Button>

            <Card>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                    <CardAction>Card Action</CardAction>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>

            <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="ghost">Ghost</Badge>
        </div>


    );
}