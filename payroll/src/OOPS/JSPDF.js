import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
class PDF {
    constructor() {
        this.pdf = new jsPDF();
        this.yPos = 10;
        this.PageWidth = this.pdf.internal.pageSize.getWidth();
        this.PageHeight = this.pdf.internal.pageSize.getHeight();
        this.pdf.setDrawColor(0);
        this.pdf.setLineWidth(1);
        this.pdf.rect(5, 5, this.PageWidth - 10, this.PageHeight - 10);
        this.twoD;
    }
    AddMiddleContent(Main) {
        const textWidth = this.pdf.getTextWidth(Main);
        const xPos = (this.PageWidth - textWidth) / 2;
        this.pdf.setFontSize(15);
        this.pdf.text(Main, xPos, 10);
        this.yPos += 10;
        this.pdf.setFontSize(60);
        this.pdf.setTextColor(150, 150, 150);
        this.pdf.text("CONFIDENTIAL", (this.PageWidth - 12) / 2, (this.PageHeight/2), {
            align: "center",
            angle: 45,
        });
    }
    addContent(text) {
        this.pdf.setFontSize(12);
        this.pdf.text(text, 10, this.yPos);
        this.yPos += 10;
    }
    Addtabel() {
        const headers = ["Id", "Role", "Name", "Salary", "Tax"];
        autoTable(this.pdf, {
            startY: 25,
            head: [headers],
            body: this.twoD,
            theme: "grid",
            headStyles: { fillColor: [22, 160, 133] },
            styles: { fontSize: 12 },
            alternateRowStyles: { fillColor: [240, 240, 240] },
        });

    }
    TaxDetect = (amt) => {
        if (amt < 300000) return 0;
        if (amt <= 600000) return 5;
        if (amt <= 900000) return 10;
        if (amt <= 1200000) return 20;
        return 30;
    };
    async Request() {
        try {
            const user = await axios.get('http://localhost:3000/User/api/UserAccepted');
            const data = user.data.Uobj || [];
            const datas = data.map((obj, index) => {
                const id = index + 1;
                const role = obj.Role || 'Unknown';
                const firstName = obj.Name || 'N/A';
                const salary = Number(obj.BaseSalary) || 0;
                const taxPercent = this.TaxDetect(salary);

                return [
                    id,
                    role,
                    firstName,
                    Math.round(salary / 12),
                    taxPercent,
                ];
            });
            this.twoD = datas;
        } catch (err) {
            console.error('Error fetching users:', err);
        }
    }
    SaveName(filename = "PayRollSystemByManojAndPunith.pdf") {
        this.pdf.save(filename);
    }
}

export default PDF;