using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DoAn_WebBanDoChoi.Migrations
{
    public partial class PostpreSQL : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "loai_san_pham",
                columns: table => new
                {
                    ma_loai = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ten_loai = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("loai_san_pham_pkey", x => x.ma_loai);
                });

            migrationBuilder.CreateTable(
                name: "role",
                columns: table => new
                {
                    role_id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    role_name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_role", x => x.role_id);
                });

            migrationBuilder.CreateTable(
                name: "thuong_hieu",
                columns: table => new
                {
                    math = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    tenth = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("thuong_hieu_pkey", x => x.math);
                });

            migrationBuilder.CreateTable(
                name: "account",
                columns: table => new
                {
                    makh = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    email = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ho_ten = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    mat_khau = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ngay_dang_ky = table.Column<DateOnly>(type: "date", nullable: true),
                    so_dien_thoai = table.Column<string>(type: "character varying(15)", maxLength: 15, nullable: true),
                    role_id = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("account_pkey", x => x.makh);
                    table.ForeignKey(
                        name: "account_role_id_fkey",
                        column: x => x.role_id,
                        principalTable: "role",
                        principalColumn: "role_id");
                });

            migrationBuilder.CreateTable(
                name: "san_pham",
                columns: table => new
                {
                    masp = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    gia = table.Column<double>(type: "double precision", nullable: false),
                    hinh_anh = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    mo_ta = table.Column<string>(type: "text", nullable: true),
                    ngay_cap_nhat = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    ngay_tao = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    so_luong_ton = table.Column<int>(type: "integer", nullable: true),
                    tensp = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    trang_thai = table.Column<bool>(type: "boolean", nullable: true),
                    ma_loai = table.Column<int>(type: "integer", nullable: true),
                    math = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("san_pham_pkey", x => x.masp);
                    table.ForeignKey(
                        name: "san_pham_ma_loai_fkey",
                        column: x => x.ma_loai,
                        principalTable: "loai_san_pham",
                        principalColumn: "ma_loai");
                    table.ForeignKey(
                        name: "san_pham_math_fkey",
                        column: x => x.math,
                        principalTable: "thuong_hieu",
                        principalColumn: "math");
                });

            migrationBuilder.CreateTable(
                name: "don_hang",
                columns: table => new
                {
                    madh = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    dia_chi_giao = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    ngay_dat = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    tong_tien = table.Column<double>(type: "double precision", nullable: true),
                    trang_thai = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    makh = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("don_hang_pkey", x => x.madh);
                    table.ForeignKey(
                        name: "don_hang_makh_fkey",
                        column: x => x.makh,
                        principalTable: "account",
                        principalColumn: "makh");
                });

            migrationBuilder.CreateTable(
                name: "gio_hang",
                columns: table => new
                {
                    magh = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ngay_tao = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    makh = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("gio_hang_pkey", x => x.magh);
                    table.ForeignKey(
                        name: "gio_hang_makh_fkey",
                        column: x => x.makh,
                        principalTable: "account",
                        principalColumn: "makh");
                });

            migrationBuilder.CreateTable(
                name: "chi_tiet_don_hang",
                columns: table => new
                {
                    madh = table.Column<int>(type: "integer", nullable: false),
                    masp = table.Column<int>(type: "integer", nullable: false),
                    don_gia = table.Column<double>(type: "double precision", nullable: true),
                    so_luong = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("chi_tiet_don_hang_pkey", x => new { x.madh, x.masp });
                    table.ForeignKey(
                        name: "chi_tiet_don_hang_madh_fkey",
                        column: x => x.madh,
                        principalTable: "don_hang",
                        principalColumn: "madh");
                    table.ForeignKey(
                        name: "chi_tiet_don_hang_masp_fkey",
                        column: x => x.masp,
                        principalTable: "san_pham",
                        principalColumn: "masp");
                });

            migrationBuilder.CreateTable(
                name: "chi_tiet_gio_hang",
                columns: table => new
                {
                    magh = table.Column<int>(type: "integer", nullable: false),
                    masp = table.Column<int>(type: "integer", nullable: false),
                    don_gia = table.Column<double>(type: "double precision", nullable: true),
                    so_luong = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("chi_tiet_gio_hang_pkey", x => new { x.magh, x.masp });
                    table.ForeignKey(
                        name: "chi_tiet_gio_hang_magh_fkey",
                        column: x => x.magh,
                        principalTable: "gio_hang",
                        principalColumn: "magh");
                    table.ForeignKey(
                        name: "chi_tiet_gio_hang_masp_fkey",
                        column: x => x.masp,
                        principalTable: "san_pham",
                        principalColumn: "masp");
                });

            migrationBuilder.CreateIndex(
                name: "account_email_key",
                table: "account",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_account_role_id",
                table: "account",
                column: "role_id");

            migrationBuilder.CreateIndex(
                name: "IX_chi_tiet_don_hang_masp",
                table: "chi_tiet_don_hang",
                column: "masp");

            migrationBuilder.CreateIndex(
                name: "IX_chi_tiet_gio_hang_masp",
                table: "chi_tiet_gio_hang",
                column: "masp");

            migrationBuilder.CreateIndex(
                name: "IX_don_hang_makh",
                table: "don_hang",
                column: "makh");

            migrationBuilder.CreateIndex(
                name: "IX_gio_hang_makh",
                table: "gio_hang",
                column: "makh");

            migrationBuilder.CreateIndex(
                name: "role_role_name_key",
                table: "role",
                column: "role_name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_san_pham_ma_loai",
                table: "san_pham",
                column: "ma_loai");

            migrationBuilder.CreateIndex(
                name: "IX_san_pham_math",
                table: "san_pham",
                column: "math");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "chi_tiet_don_hang");

            migrationBuilder.DropTable(
                name: "chi_tiet_gio_hang");

            migrationBuilder.DropTable(
                name: "don_hang");

            migrationBuilder.DropTable(
                name: "gio_hang");

            migrationBuilder.DropTable(
                name: "san_pham");

            migrationBuilder.DropTable(
                name: "account");

            migrationBuilder.DropTable(
                name: "loai_san_pham");

            migrationBuilder.DropTable(
                name: "thuong_hieu");

            migrationBuilder.DropTable(
                name: "role");
        }
    }
}
